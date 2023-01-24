import { AuthConfig } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8086/auth-server/oauth2',
  redirectUri: window.location.origin + '/home',
  clientId: 'api-user',
  dummyClientSecret: 's3cr3t',
  responseType: 'code',
  scope: 'api.read',
  nonceStateSeparator: '-',
  loginUrl: 'http://localhost:8086/auth-server/oauth2/authorize',
  tokenEndpoint: 'http://localhost:8086/auth-server/oauth2/token',
  useHttpBasicAuth: true,
  showDebugInformation: true,
  oidc: false,
  disablePKCE: false,
  revocationEndpoint: 'http://localhost:8086/auth-server/oauth2/revoke',
}
