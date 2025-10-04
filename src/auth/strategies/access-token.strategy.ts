import { Request } from 'express';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { extractTokenFromCookie } from 'src/utils';
import { JwtPayload } from 'src/shared/interfaces';
import { TokenType } from 'src/auth/enum';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.access_token,
) {
  constructor(
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.access_token),
      ]),
      secretOrKey: configService.get<string>('auth.accessTokenSecret', {
        infer: true,
      }),
    });
  }

  async validate(req: any, payload: JwtPayload, done: VerifiedCallback) {
    const { type, sub, role } = payload;
    if (type !== TokenType.access_token)
      return done(new UnauthorizedException('Token is not an access token'));

    req.userId = sub;
    req.role = role;

    done(null, sub);
  }
}
