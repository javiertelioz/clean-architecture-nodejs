/**
 * Access Token Manager Interface
 */
export interface AccessTokenManager {
  generate: (payload: string | Buffer | any) => string;
  decode: (token: string) => any;
}
