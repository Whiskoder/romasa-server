import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { extractTokenFromCookie } from 'src/utils';

import { TokenType } from 'src/auth/enum';

@Injectable()
export class OneTimeTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.one_time_token,
) {
  constructor() {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.one_time_token),
      ]),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {},
    });
  }

  validate(...args: any[]): any {}
}
