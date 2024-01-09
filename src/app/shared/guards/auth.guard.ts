import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { map, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authGuardFn: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = sessionStorage.getItem('access_token');
  if(accessToken) {
    console.log("TEM")
    return true;
    // return authService.hasValidAccessToken()
    // .pipe(
    //   map( response => {
    //     if(!response.active) {
    //       return router.createUrlTree(['/login']);
    //     }
    //     console.log("VAI PRA HOME")
    //     return router.createUrlTree(['/home']);
    //   }),
    //   catchError( (error) => {
    //     router.navigate(['/login']);
    //     return throwError(() => error);
    //   })
    // );
  } else {
    console.log("NÃO TEM")
    saveSession();
    return router.createUrlTree(['/home']);
  }
}

const saveSession = async () => {
  const authService = inject(AuthService);
  await authService.doLogin();
}
