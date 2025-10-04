import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { extractTokenFromCookie } from '../utils/extract-token-from-cookie.util';
import { TokenType } from '../enum/token-type.enum';
import {Request} from 'express'

@Injectable()
export class OneTimeTokenStrategy extends PassportStrategy(Strategy, TokenType.one_time_token) {
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
