import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TokenType } from '../enum';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/core/config';
import { extractTokenFromCookie } from 'src/core/utils';
import { JwtPayload } from 'src/core/interfaces';
import { InvalidTokenException } from '../exceptions';

@Injectable()
export class RegisterTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.register_token,
) {
  constructor(
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.register_token),
      ]),
      secretOrKey: configService.get<string>('auth.registerTokenSecret', {
        infer: true,
      }),
    });
  }

  async validate(req: any, payload: any, done: VerifiedCallback) {
    const { employeeId, email, type } = payload;
    if (type !== TokenType.register_token)
      return done(
        new InvalidTokenException('El token no es del tipo register_token'),
      );

    req.employeeId = employeeId;
    req.email = email;

    done(null, payload);
  }
}
