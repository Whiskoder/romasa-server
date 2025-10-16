import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AllConfigType } from 'src/core/config';
import { extractTokenFromCookie } from 'src/core/utils';
import { InvalidTokenException } from 'src/auth/exceptions';
import { JwtPayload } from 'src/core/interfaces';
import { TokenType } from 'src/auth/enum';

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
    const { type, userId, userGroupId, permissionsVersion } = payload;
    if (type !== TokenType.access_token)
      return done(
        new InvalidTokenException('El token no es de tipo access_token'),
      );

    req.userId = userId;
    req.userGroupId = userGroupId;
    req.permissionsVersion = permissionsVersion;

    done(null, userId);
  }
}
