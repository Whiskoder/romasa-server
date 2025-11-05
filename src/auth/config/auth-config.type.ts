export type AuthConfig = {
  accessTokenExpiresIn?: number;
  accessTokenSecret?: string;
  cookiesHttpOnly?: boolean;
  cookiesSameSite?: 'strict' | 'lax' | 'none';
  cookiesSecure?: boolean;
  refreshTokenExpiresIn?: number;
  registerNonceExpiresIn?: number;
  registerTokenExpiresIn?: number;
  registerTokenSecret?: string;
};
