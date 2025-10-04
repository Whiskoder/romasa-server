import { TokenType } from '@mod/auth/enum/token-type.enum'
import { Request } from 'express';

export const extractTokenFromCookie = (
  req: Request,
  tokenType: TokenType,
): string | null => {
  return req?.cookies?.[tokenType] || null;
};
