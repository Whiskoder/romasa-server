import { Request } from 'express';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { CryptoService } from 'src/crypto/crypto.service';
import { extractTokenFromCookie, validatePayload } from 'src/core/utils';
import { InvalidTokenException } from 'src/auth/exceptions';
import { JwtPayload } from 'src/core/interfaces';
import { TokenType } from 'src/auth/enum';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.refresh_token,
) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.refresh_token),
      ]),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        let payload: JwtPayload | undefined;
        try {
          payload = this.jwtService.decode(rawJwtToken);
        } catch (e) {
          return done(new InvalidTokenException('Token no válido'));
        }

        if (!payload) return done(new InvalidTokenException('Token no válido'));

        const isValidPayload = await validatePayload(payload);
        if (!isValidPayload)
          return done(new InvalidTokenException('Payload no válido'));

        const user = await this.usersService.findById(payload.userId, [
          'group',
          'employee',
        ]);
        if (!user)
          return done(new InvalidTokenException('Usuario no encontrado'));

        req.user = user;

        const tokenSecretKey = this.cryptoService.decipher(
          user.encryptedTokenSecret,
        );
        done(null, tokenSecretKey);
      },
    });
  }

  async validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
    if (payload.type !== TokenType.refresh_token) {
      return done(
        new InvalidTokenException('El token no es de tipo refresh_token'),
      );
    }
    const user = req.user as User;

    done(null, user);
  }
}
