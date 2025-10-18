import { Response } from 'express';
import { Injectable } from '@nestjs/common';

import { bcryptPlugin } from 'src/core/plugins';
import { LoginUserDto } from 'src/auth/dtos';
import { User } from 'src/users/entities';
import { CookieService, TokenService } from 'src/auth/services';
import { UsersService } from 'src/users/users.service';
import {
  InvalidCredentialsException,
  UserNoLongerActiveException,
} from 'src/auth/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async me(userId: string): Promise<User> {
    const user = await this.usersService.findById(userId, [
      'group',
      'employee',
    ]);
    if (!user) throw new UserNoLongerActiveException();
    return user;
  }

  async login(loginUserDto: LoginUserDto, res: Response): Promise<User> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email, [
      'group',
      'employee',
    ]);
    if (!user)
      throw new InvalidCredentialsException(
        'El usuario con ese email no existe',
      );

    const validPassword = bcryptPlugin.compare(password, user.hashedPassword);

    if (!validPassword)
      throw new InvalidCredentialsException('Contraseña incorrecta');

    await this.setAuthCookies(res, user);

    return user;
  }

  // TODO: user can't have multiple sessions
  async refresh(user: User, res: Response): Promise<void> {
    await this.setAuthCookies(res, user);
  }
  /**
   * TODO: revolke old token
   * Move token fn to tokenService
   * create fn in tokenService to revoke used RefreshToken
   */
  async logout(res: Response, rawRefreshToken?: string | null): Promise<void> {
    this.cookieService.clearAuthCookies(res);

    // revoke old token
    // if (!rawRefreshToken?.trim()) return;

    // try {
    //   const payload = await this.decodeAndValidatePayload(rawRefreshToken);
    //   if (!payload) return;

    //   const { userId, jti } = payload;

    //   const user = await this.userService.findById(userId, [
    //     'userRefreshTokens',
    //   ]);

    //   if (!user) return;

    //   const tokenRecord = user.userRefreshTokens.find(
    //     (token) => token.jwtid === jti,
    //   );
    //   if (!tokenRecord) return;

    //   const isValidToken = await this.verifyTokenSignature(
    //     rawRefreshToken,
    //     user.cipheredTokenSecret,
    //     userId,
    //   );
    //   if (!isValidToken) return;

    //   await this.userRefreshTokenService.disableUserRefreshToken({
    //     jwtid: jti,
    //   });
    // } catch (e) {}
  }

  private async setAuthCookies(res: Response, userEntity: User) {
    const accessToken = await this.tokenService.generateAccessToken(userEntity);
    const refreshToken =
      await this.tokenService.generateRefreshToken(userEntity);

    await this.cookieService.setTokenCookie(res, accessToken);
    await this.cookieService.setTokenCookie(res, refreshToken);
  }
}
