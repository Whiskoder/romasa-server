import { Response } from 'express';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AllConfigType } from 'src/core/config';
import { TokenType } from 'src/auth/enum';

@Injectable()
export class CookieService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {}

  async clearAuthCookies(res: Response) {
    res.clearCookie(TokenType.access_token);
    res.clearCookie(TokenType.refresh_token);
    res.clearCookie(TokenType.register_token);
  }

  async setTokenCookie(res: Response, token: string) {
    const { exp, type } = this.jwtService.decode(token);

    const calculateExpiration = () => {
      const now = Math.floor(Date.now() / 1000);
      return (exp - now) * 1000;
    };

    res.cookie(type, token, {
      httpOnly: this.configService.get<boolean>('auth.cookiesHttpOnly', {
        infer: true,
      }),
      secure: this.configService.get<boolean>('auth.cookiesSecure', {
        infer: true,
      }),
      sameSite: this.configService.get<any>('auth.cookiesSameSite', {
        infer: true,
      }),
      maxAge: calculateExpiration(),
    });
  }
}
