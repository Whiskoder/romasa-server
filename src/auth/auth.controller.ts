import type { Response } from 'express';

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
import { GetUser, AuthAccess } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { UserMapper } from 'src/users/mappers/user.mapper';
import { ResponseUserDto } from 'src/users/dtos';
import { LoginUserDto } from 'src/auth/dtos';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
  ) {}

  // @Throttle({ default: { limit: 3, ttl: 1_000, blockDuration: 60_000 } })
  @Get('me')
  @AuthAccess()
  @ApiResponse(200, 'User found')
  async meUser(
    @GetUser() userEntity: User,
  ): Promise<{ user: ResponseUserDto }> {
    throw new InternalServerErrorException('not implemented');
    // const userDto = this.userMapper.toResponseDto(userEntity);
    // return { user: userDto };
  }

  @Post('email/login')
  @ApiResponse(200, 'User logged in')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    const userEntity = await this.authService.login(loginUserDto, res);
    // const userEntity = await this.authService.login(loginUserDto, res);
    const userDto = this.userMapper.toResponseDto(userEntity);
    return { user: userDto };
  }

  @Post('refresh')
  @AuthAccess()
  @ApiResponse(200, 'User token refreshed')
  async refresh(
    @GetUser() userEntity: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: ResponseUserDto }> {
    throw new InternalServerErrorException('not implemented');
    // await this.authService.refresh(userEntity, res);
    // const userDto = this.userMapper.toResponseDto(userEntity);
    // return { user: userDto };
  }

  // TODO: review
  @Post('logout')
  @ApiResponse(204, 'User logged out')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    throw new InternalServerErrorException('not implemented');
    // const refreshToken = extractTokenFromCookie(req, TokenType.REFRESH_TOKEN);
    // // await this.authService.logout(res, refreshToken);
  }
}
