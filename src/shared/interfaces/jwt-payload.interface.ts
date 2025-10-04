export interface JwtPayload {
  sub?: string;
  exp: number;
  iat: number;
  jti: string;
}
