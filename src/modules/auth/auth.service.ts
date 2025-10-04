import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import { User } from "@mod/users/entities/user.entity";
import { uuidPlugin } from "@config/plugins/uuid.plugin";
import { JwtService } from "@nestjs/jwt";

import {Response} from 'express'
import { UserService } from "@mod/users/user.service";
import { CryptoService } from "@mod/crypto/crypto.service";
import { bcryptPlugin } from "@config/plugins/bcrypt.plugin";
import { EnvVar } from "@config/env.config";
import { ConfigService } from "@nestjs/config";
import { TokenType } from "./enum/token-type.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvVar, true>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    // private readonly notificationsService: NotificationsService,
    // private readonly userRefreshTokenService: UserRefreshTokenService,
    // private readonly invitationTokenService: InvitationTokenService,
  ) {}

  async login(loginUserDto: LoginUserDto, res: Response): Promise<User> {
    const { email, password } = loginUserDto;

    let userEntity: User | undefined;
    try {
      userEntity = await this.userService.findByEmail(email);
    } catch (e) {
      throw new UnauthorizedException('user_not_found');
    }

    const validPassword = bcryptPlugin.compare(
      password,
      userEntity.hashedPassword,
    );

    if (!validPassword) throw new UnauthorizedException('invalid_password');

    await this.setAuthCookies(res, userEntity);

    return userEntity;
  }

  // TODO: user can't have multiple sessions

  // async refresh(userEntity: User, res: Response): Promise<void> {
  //   await this.setAuthCookies(res, userEntity);
  // }

  // async logout(res: Response, rawRefreshToken?: string | null): Promise<void> {
  //   this.clearAuthCookies(res);

  //   if (!rawRefreshToken?.trim()) return;

  //   try {
  //     const payload = await this.decodeAndValidatePayload(rawRefreshToken);
  //     if (!payload) return;

  //     const { userId, jti } = payload;

  //     const user = await this.userService.findById(userId, [
  //       'userRefreshTokens',
  //     ]);

  //     if (!user) return;

  //     const tokenRecord = user.userRefreshTokens.find(
  //       (token) => token.jwtid === jti,
  //     );
  //     if (!tokenRecord) return;

  //     const isValidToken = await this.verifyTokenSignature(
  //       rawRefreshToken,
  //       user.cipheredTokenSecret,
  //       userId,
  //     );
  //     if (!isValidToken) return;

  //     await this.userRefreshTokenService.disableUserRefreshToken({
  //       jwtid: jti,
  //     });
  //   } catch (e) {}
  // }

  // private async clearAuthCookies(res: Response) {
  //   res.clearCookie(TokenType.ACCESS_TOKEN);
  //   res.clearCookie(TokenType.REFRESH_TOKEN);
  //   res.clearCookie(TokenType.FORM_TOKEN);
  //   res.clearCookie(TokenType.REGISTER_TOKEN);
  // }

  private async setAuthCookies(res: Response, userEntity: User) {
    const accessToken = await this.generateAccessToken(userEntity);
    //   const refreshToken = await this.generateRefreshToken(userEntity);
    await this.setTokenCookie(res, accessToken);
    // await this.setTokenCookie(res, refreshToken);
  }

  private async generateAccessToken(userEntity: User) {
    const payload = { userId: userEntity.id, type: TokenType.access_token };

    const jwtid = uuidPlugin.v7();
    // const secret = this.cryptoService.decipher(userEntity.encryptedTokenSecret);
    const secret = 'abc';

    // const expiresIn = this.configService.get('jwt.accessTokenExpiration', { infer: true })
    const expiresIn = 3600;

    return this.jwtService.signAsync(payload, { jwtid, secret, expiresIn });
  }

  private async setTokenCookie(res: Response, token: string) {
    const { exp, type } = this.jwtService.decode(token);

    const calculateExpiration = () => {
      const now = Math.floor(Date.now() / 1000);
      return (exp - now) * 1000;
    };

    res.cookie(type, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: calculateExpiration(),
    });
  }

  // private async generateRefreshToken(userEntity: User): Promise<string> {
  //   const payload: Partial<RefreshTokenPayload> = {
  //     type: TokenType.REFRESH_TOKEN,
  //     userId: userEntity.id,
  //   };

  //   const token = await this.generateToken({ payload, userEntity });
  //   await this.userRefreshTokenService.createUserRefreshToken({
  //     token,
  //     userEntity,
  //   });
  //   return token;
  // }

  // private async generateToken(opts: {
  //   payload: Record<string, any>;
  //   userEntity?: User;
  //   expiresIn?: number;
  // }) {
  //   const { payload, userEntity, expiresIn } = opts;
  //   const jwtid = uuidPlugin.v7();
  //   let secret = this.configService.get('jwt.secret', { infer: true });
  //   if (userEntity) {
  //     secret = this.cryptoService.decipher(userEntity.cipheredTokenSecret);
  //   }

  //   const type = payload.type;

  //   return this.jwtService.signAsync(payload, {
  //     jwtid,
  //     secret,
  //     expiresIn: expiresIn ? expiresIn : this.getTokenExpiration(type),
  //   });
  // }

  // private getTokenExpiration(type: TokenType): string {
  //   const expirationMap: any = {
  //     [TokenType.ACCESS_TOKEN]: 'jwt.accessTokenExpiration',
  //     [TokenType.REFRESH_TOKEN]: 'jwt.refreshTokenExpiration',
  //     [TokenType.REGISTER_TOKEN]: 'jwt.inviteTokenExpiration',
  //     [TokenType.RESET_PASSWORD_TOKEN]: 'jwt.resetPasswordTokenExpiration',
  //   };

  //   const exp = this.configService.get(expirationMap[type], {
  //     infer: true,
  //   });
  //   return exp;
  // }
}