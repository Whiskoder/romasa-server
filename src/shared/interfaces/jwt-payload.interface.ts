import { TokenType } from "src/auth/enum";
import { Roles } from "src/users/enums";

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
  jti: string;
  role: Roles
  type: TokenType
}
