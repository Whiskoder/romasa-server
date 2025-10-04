import { Request } from 'express';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

// import { CryptoService } from '@mod/crypto/crypto.service';
import { extractTokenFromCookie } from '@mod/auth/utils/extract-token-from-cookie.util';
// import { TokenType } from '@common/enums/token-type.enum';
import { User } from '@mod/users/entities/user.entity';
import { UserService } from '@mod/users/user.service'
// import { AccessTokenPayload } from '@mod/auth/interfaces/access-token-payload.interface';
import { TokenType } from '../enum/token-type.enum';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  TokenType.access_token
) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractTokenFromCookie(req, TokenType.access_token),
      ]),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        // try {
        //   const payload: AccessTokenPayload | unknown =
        //     this.jwtService.decode(rawJwtToken);

        //   if (
        //     typeof payload !== 'object' ||
        //     payload === null ||
        //     !('userId' in payload) ||
        //     typeof payload.userId !== 'string'
        //   )
        //     throw new UnauthorizedException('Invalid token payload');

        //   const userId = payload.userId;

        //   if (!userId)
        //     return done(new UnauthorizedException('Token user not found'));

        //   let user: User | undefined;
        //   try {
        //     user = await this.userService.findById(userId, [
        //       'userRefreshTokens',
        //     ]);
        //   } catch (e) {
        //     return done(new UnauthorizedException('Token user not found'));
        //   }

        //   req.user = user;

        //   const tokenSecretKey = this.cryptoService.decipher(
        //     user.cipheredTokenSecret,
        //   );
        done(null)
        //   done(null, tokenSecretKey);
        // } catch (e) {
        //   done(new UnauthorizedException('Invalid or expired token'));
        // }
      },
    });
  }

  async validate(
    req: Request,
    payload: any,
    done: VerifiedCallback,
  ) {
    done(null, {user: 'mundo'})
    // const { type, userId } = payload;
    // if (type !== TokenType.ACCESS_TOKEN)
    //   return done(new UnauthorizedException('Token is not an access token'));

    // const user = req.user as User;
    // if (!user) return done(new UnauthorizedException('Token user not found'));
    // if (user.id !== userId)
    //   return done(new UnauthorizedException('User id mismatch'));

    // done(null, user);
  }
}
