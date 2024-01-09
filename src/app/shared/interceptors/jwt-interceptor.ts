import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token');
    const urlIntrospectValidToken = request.url.search('introspect');
    const urlRevokeToken = request.url.search('revoke');
    const introspectDummy = 'YXBpLXVzZXI6czNjcjN0';
    const VALID_SEARCH = 0;

    if (token &&
      urlIntrospectValidToken < VALID_SEARCH &&
      urlRevokeToken < VALID_SEARCH) {
      if(request?.body?.get('refresh_token')) {
        request = this.setBasicAuth(request, token, introspectDummy);
      } else {
        request.headers.delete('Authorization', 'Basic ' + introspectDummy);
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        });
      }
    }
    if (token && urlIntrospectValidToken > VALID_SEARCH) {
      request = this.setBasicAuth(request, token, introspectDummy);
    }
    if (token && urlRevokeToken > VALID_SEARCH) {
      request = this.setBasicAuth(request, token, introspectDummy);
    }

    return next.handle(request);
  }

  setBasicAuth(request: HttpRequest<any>, token: string, introspectDummy: string): HttpRequest<any> {
    request.headers.delete('Authorization', 'Bearer ' + token);
    return request.clone({
      headers: request.headers.set('Authorization', 'Basic ' + introspectDummy)
    });
  }
}
