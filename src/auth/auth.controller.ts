import type { Response, Request } from 'express';

import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiResponse } from 'src/core/decorators/response.decorator';
import { AuthService } from 'src/auth/auth.service';

import {
  LoginUserDto,
  NonceHeadersDto,
  RegisterUserDto,
  SendRegisterLinkDto,
} from 'src/auth/dtos';
import { ResponseUserDto } from 'src/users/dto';
import { UserMapper } from 'src/users/mappers';
import { extractTokenFromCookie } from 'src/core/utils';
import { TokenType } from 'src/auth/enum';
import {
  AuthGuard,
  AuthRefreshToken,
  AuthRegisterToken,
  GetEmail,
  GetEmployeeId,
  GetUser,
  GetUserId,
} from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { Permissions } from 'src/permissions/constants';
import { ReqHeaders } from 'src/core/decorators';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @AuthGuard()
  @ApiResponse(200, 'Usuario encontrado')
  async meUser(
    @GetUserId() userId: string,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.authService.me(userId);
    return { user: UserMapper.toResponseDto(user) };
  }

  @Post('email/register')
  @AuthRegisterToken()
  @ApiResponse(200, 'Cuenta creada')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @GetEmployeeId() employeeId: number,
    @GetEmail() email: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const { password } = registerUserDto;
    const userDto = await this.authService.register(
      password,
      email,
      employeeId,
      res,
    );
    return { user: UserMapper.toResponseDto(userDto) };
  }

  @Post('email/login')
  @ApiResponse(200, 'Sesión iniciada')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.authService.login(loginUserDto, res);
    return { user: UserMapper.toResponseDto(user) };
  }

  @Post('refresh')
  @AuthRefreshToken()
  @ApiResponse(200, 'Sesión refrescada')
  async refresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    await this.authService.refresh(user, res);
    return { user: UserMapper.toResponseDto(user) };
  }

  @Post('logout')
  @ApiResponse(204, 'Sesión terminada')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = extractTokenFromCookie(req, TokenType.refresh_token);
    await this.authService.logout(res, refreshToken);
  }

  @Post('send-register-link')
  @ApiResponse(200, 'Invitación enviada')
  @AuthGuard(Permissions.auth.send_register_link)
  async sendRegisterLink(
    @Body() sendRegisterLinkDto: SendRegisterLinkDto,
  ): Promise<void> {
    await this.authService.sendRegisterLink(sendRegisterLinkDto);
  }

  @Post('exchange-nonce-for-token')
  @ApiResponse(200, 'Token generado')
  async exchangeNonceForToken(
    @ReqHeaders(
      new ValidationPipe({ validateCustomDecorators: true, transform: true }),
    )
    nonceHeadersDto: NonceHeadersDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ email: string }> {
    const result = await this.authService.exchangeNonceForToken(
      res,
      nonceHeadersDto,
    );
    return result;
  }
}
