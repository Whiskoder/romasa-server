import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { extractTokenFromCookie } from '../utils/extract-token-from-cookie.util';
import { TokenType } from '../enum/token-type.enum';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, TokenType.refresh_token) {
  constructor() {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.refresh_token),
      ]),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {},
    });
  }

  validate(...args: any[]): any {}
}
