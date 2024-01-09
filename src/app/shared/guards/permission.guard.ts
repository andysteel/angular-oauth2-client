import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, catchError, throwError, from } from "rxjs";
import { AuthService } from "../services/auth.service";

export const permissionGuardFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = sessionStorage.getItem('access_token');
  if(accessToken) {
    return authService.hasValidAccessToken()
    .pipe(
      map( response => {
        if(!response.active) {
          return router.createUrlTree(['/login']);
        }
        return response.active;
      }),
      catchError( (error) => {
        router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  return from(saveSession())
    .pipe(
      map((_) => {
        const accessToken = sessionStorage.getItem('access_token');
        if(!accessToken) {
          return router.createUrlTree(['/login']);
        }
        return true;
      }),
    catchError((error) => {
            router.navigate(['/login']);
            return throwError(() => error);
      })
    )
}

const saveSession = async () => {
  const authService = inject(AuthService);
  await authService.doLogin();
}
