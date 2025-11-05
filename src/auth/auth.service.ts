import { Response } from 'express';
import { Injectable } from '@nestjs/common';

import { bcryptPlugin, uuidPlugin } from 'src/core/plugins';
import {
  LoginUserDto,
  NonceHeadersDto,
  SendRegisterLinkDto,
} from 'src/auth/dtos';
import { User } from 'src/users/entities/user.entity';
import { CookieService, TokenService } from 'src/auth/services';
import { UsersService } from 'src/users/users.service';
import {
  InvalidCredentialsException,
  OneTimeTokenNotFoundException,
  UserNoLongerActiveException,
} from 'src/auth/exceptions';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployeeNotFoundException } from 'src/work-orders/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { OneTimeToken } from './entities/one-time-token.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';
import { AllConfigType } from 'src/core/config';
import { OneTimeTokenType } from './enum';
import MagicLinkEmail from 'src/notifications/emails/magic-link-email';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UserAlreadyExistsException } from 'src/users/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OneTimeToken)
    private readonly oneTimeTokensRepository: Repository<OneTimeToken>,
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly notificationsService: NotificationsService,
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

  // Revoke user link
  async register(
    password: string,
    email: string,
    employeeId: number,
    res: Response,
  ): Promise<User> {
    const user = await this.usersService.create({
      password,
      email,
      employeeId,
    });

    await this.setAuthCookies(res, user);

    return user;
  }

  async sendRegisterLink(
    sendRegisterLinkDto: SendRegisterLinkDto,
  ): Promise<void> {
    const { email, employeeId } = sendRegisterLinkDto;
    const employee = await this.employeeService.findById(employeeId);
    if (!employee) throw new EmployeeNotFoundException();

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new UserAlreadyExistsException();

    const nonce = this.cryptoService.generateNonce();
    const expiresIn = this.configService.get<number>(
      'auth.registerNonceExpiresIn',
      { infer: true },
    );
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    const oneTimeToken = this.oneTimeTokensRepository.create({
      id: uuidPlugin.v7(),
      employeeId: employee.id,
      tokenType: OneTimeTokenType.register_token,
      nonce,
      email,
      expiresAt,
    });

    await this.oneTimeTokensRepository.save(oneTimeToken);

    const domain = this.configService.get<string>('app.frontendDomain', {
      infer: true,
    });

    const strNonce = nonce.toString('hex');
    const message = MagicLinkEmail({
      recipientName: `${employee.firstName} ${employee.fatherName}`,
      recipientEmail: email,
      magicLink: `${domain}/auth/register?magic-link=${strNonce}`,
    });

    const notificationsDto = {
      to: email,
      subject: 'Enlace seguro para crear tu cuenta en Romasa Taller',
      message,
    };

    await this.notificationsService.notify(notificationsDto);
  }

  async exchangeNonceForToken(
    res: Response,
    nonceHeadersDto: NonceHeadersDto,
  ): Promise<{ email: string }> {
    const { 'x-auth-nonce': nonceStr } = nonceHeadersDto;
    const nonce = Buffer.from(nonceStr, 'hex');
    const oneTimeToken = await this.oneTimeTokensRepository.findOne({
      where: { nonce, isExpired: false },
    });

    if (!oneTimeToken) throw new OneTimeTokenNotFoundException();

    await this.setRegisterCookies(
      res,
      oneTimeToken.employeeId,
      oneTimeToken.email,
    );

    oneTimeToken.isExpired = true;
    await this.oneTimeTokensRepository.save(oneTimeToken);

    return { email: oneTimeToken.email };
  }

  private async setRegisterCookies(
    res: Response,
    employeeId: number,
    email: string,
  ) {
    const registerToken = await this.tokenService.generateRegisterToken(
      employeeId,
      email,
    );

    await this.cookieService.setTokenCookie(res, registerToken);
  }

  private async setAuthCookies(res: Response, userEntity: User) {
    const accessToken = await this.tokenService.generateAccessToken(userEntity);
    const refreshToken =
      await this.tokenService.generateRefreshToken(userEntity);

    await this.cookieService.setTokenCookie(res, accessToken);
    await this.cookieService.setTokenCookie(res, refreshToken);
  }
}
