import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { authCodeFlowConfig } from './types/oauth-config';
import { Base64 } from 'js-base64';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private httpClient: HttpClient) {
    this.oauthService.configure(authCodeFlowConfig);

    this.oauthService
      .events
      .pipe(
        filter(e => e.type === 'token_expires')
      ).subscribe((_) => this.refreshToken());
  }

  getUserName(): string | null {
    const claims: string[] = this.oauthService.getAccessToken().split('.');
    const payload: string = Base64.decode(claims[1]);
    return JSON.parse(payload)['user_firstname'];
  }

  getIdToken(): string {
    return this.oauthService.getIdToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  async refreshToken() {
    await this.oauthService.refreshToken()
    .catch(error => {
      this.router.navigate(['/login']);
      throw new Error('Error trying to refresh token: ', {cause: error});
    });
  }

  hasValidAccessToken() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const urlencoded = new URLSearchParams();
    urlencoded.append('token', sessionStorage.getItem('access_token'));

    return this.httpClient.post<{active: boolean}>('http://localhost:8086/auth-server/oauth2/introspect',
    urlencoded,
    {headers});
  }

  async doLogin() {
    return await this.oauthService.tryLoginCodeFlow()
    .catch(error => {
      this.router.navigate(['/login']);
      throw new Error('Error trying to login: ', {cause: error});
    });
  }

  initLogin(additionalState: string) {
    this.oauthService.initCodeFlow(additionalState);
  }

  async doLogout() {
    return await this.oauthService.revokeTokenAndLogout();
  }
}
