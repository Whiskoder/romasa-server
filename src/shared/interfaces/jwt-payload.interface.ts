import { TokenType } from "src/auth/enum";

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
  jti: string;
  type: TokenType
}
