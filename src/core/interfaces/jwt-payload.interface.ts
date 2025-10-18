import { TokenType } from 'src/auth/enum';

export interface JwtPayload {
  userId: string;
  userGroupId: string;
  isSuperAdmin: boolean;
  permissionsVersion: string;
  exp: number;
  iat: number;
  jti: string;
  type: TokenType;
}
