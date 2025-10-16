import { TokenType } from 'src/auth/enum';

export interface JwtPayload {
  userId: string;
  userGroupId: string;
  permissionsVersion: string;
  exp: number;
  iat: number;
  jti: string;
  type: TokenType;
}
