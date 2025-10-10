export type AuthConfig = {
  refreshTokenExpiresIn?: number;
  refreshTokenSecret?: string;
  accessTokenExpiresIn?: number;
  accessTokenSecret?: string;
  cookiesHttpOnly?: boolean;
  cookiesSecure?: boolean;
  cookiesSameSite?: 'strict' | 'lax' | 'none';
};
