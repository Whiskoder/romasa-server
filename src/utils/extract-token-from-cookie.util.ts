import { TokenType } from 'src/auth/enum/token-type.enum';
import { Request } from 'express';

function extractTokenFromCookie(
  req: Request,
  tokenType: TokenType,
): string | null {
  return req?.cookies?.[tokenType] || null;
}

export default extractTokenFromCookie;
