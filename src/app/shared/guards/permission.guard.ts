import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const isValidToken = this.authService.hasValidAccessToken();

      if(isValidToken) {
        return isValidToken;
      } else {
        return new Promise( async (res) => {
          await this.authService.refreshToken();
          const isUsuarioLogado = this.authService.hasValidAccessToken();
          if(isUsuarioLogado) {
            res(true);
          } else {
            res(this.router.parseUrl('/login'));
          }
        })
      }

  }

}
