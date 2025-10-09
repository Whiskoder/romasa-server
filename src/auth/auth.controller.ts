import type { Response, Request } from 'express';

import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { ApiResponse } from 'src/shared/decorators/response.decorator';
import { AuthService } from 'src/auth/auth.service';
import {
  GetUser,
  AuthAccess,
  GetUserId,
  AuthRefreshToken,
} from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { UserMapper } from 'src/users/mappers/user.mapper';
import { ResponseUserDto } from 'src/users/dtos';
import { LoginUserDto, RegisterUserDto } from 'src/auth/dtos';
import { UserService } from 'src/users/user.service';
import { extractTokenFromCookie } from 'src/utils';
import { TokenType } from 'src/auth/enum';
import { Roles } from 'src/users/enums';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
    private readonly userService: UserService,
  ) {}

  @AuthAccess()
  @Get('me')
  @ApiResponse(200, 'User found')
  async meUser(
    @GetUserId() userId: string,
  ): Promise<{ user: ResponseUserDto }> {
    const userEntity = await this.userService.findById(userId, ['employee']);
    if (!userEntity) throw new InternalServerErrorException('User not found');
    return { user: this.userMapper.toResponseDto(userEntity) };
  }

  @Post('email/login')
  @ApiResponse(200, 'User logged in')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const userEntity = await this.authService.login(loginUserDto, res);
    const userDto = this.userMapper.toResponseDto(userEntity);
    return { user: userDto };
  }

  // TODO: add onetimetokenvalidation
  @Post('email/register')
  @AuthAccess(Roles.admin)
  @ApiResponse(201, 'User registered')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const userEntity = await this.authService.register(registerUserDto);
    const userDto = this.userMapper.toResponseDto(userEntity);
    return { user: userDto };
  }

  @AuthRefreshToken()
  @Post('refresh')
  @ApiResponse(200, 'User token refreshed')
  async refresh(
    @GetUser() userEntity: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    await this.authService.refresh(userEntity, res);
    const userDto = this.userMapper.toResponseDto(userEntity);
    return { user: userDto };
  }

  // TODO: review
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
