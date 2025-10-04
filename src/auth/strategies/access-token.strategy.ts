import { Request } from 'express';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { CryptoService } from 'src/crypto/crypto.service';
import { extractTokenFromCookie, validatePayload } from 'src/utils';
import { JwtPayload } from 'src/shared/interfaces';
import { TokenType } from 'src/auth/enum';
import { User } from 'src/users/entities';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.access_token,
) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.access_token),
      ]),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        const payload: any = this.jwtService.decode(rawJwtToken);

        const isValidPayload = await validatePayload(payload);
        if (!isValidPayload)
          done(new UnauthorizedException('Invalid token payload'));

        const userId = payload.sub;

        const userEntity = await this.userService.findById(userId);
        if (!userEntity)
          return done(new UnauthorizedException('Token user not found'));

        req.user = userEntity;

        const tokenSecretKey = this.cryptoService.decipher(
          userEntity.encryptedTokenSecret,
        );
        done(null, tokenSecretKey);
      },
    });
  }

  async validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
    const { type, sub } = payload;
    if (type !== TokenType.access_token)
      return done(new UnauthorizedException('Token is not an access token'));

    const user = req.user as User;
    if (!user) return done(new UnauthorizedException('Token user not found'));
    if (user.id !== sub)
      return done(new UnauthorizedException('User id mismatch'));

    done(null, user);
  }
}
