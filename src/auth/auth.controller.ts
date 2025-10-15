import type { Response, Request } from 'express';

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { ApiResponse } from 'src/core/decorators/response.decorator';
import { AuthService } from 'src/auth/auth.service';

import { LoginUserDto } from 'src/auth/dtos';
import { ResponseUserDto } from 'src/users/dto';
import { UserMapper } from 'src/users/mappers';
import { extractTokenFromCookie } from 'src/core/utils';
import { TokenType } from 'src/auth/enum';
import {
  AuthGuard,
  AuthRefreshToken,
  GetUser,
  GetUserId,
} from 'src/auth/decorators';
import { User } from 'src/users/entities';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthGuard()
  @Get('me')
  @ApiResponse(200, 'User found')
  async meUser(
    @GetUserId() userId: string,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.authService.me(userId);
    return { user: UserMapper.toResponseDto(user) };
  }

  @Post('email/login')
  @ApiResponse(200, 'User logged in')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.authService.login(loginUserDto, res);
    return { user: UserMapper.toResponseDto(user) };
  }

  @AuthRefreshToken()
  @Post('refresh')
  @ApiResponse(200, 'User token refreshed')
  async refresh(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    await this.authService.refresh(user, res);
    return { user: UserMapper.toResponseDto(user) };
  }

  @Post('logout')
  @ApiResponse(204, 'User logged out')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = extractTokenFromCookie(req, TokenType.refresh_token);
    await this.authService.logout(res, refreshToken);
  }
}
