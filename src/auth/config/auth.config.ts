import { registerAs } from '@nestjs/config';

import {
  IsInt,
  IsPositive,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';

import { AuthConfig } from 'src/auth/config/auth-config.type';
import { validateConfig } from 'src/utils';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_ACCESS_TOKEN_SECRET: string;

  @IsInt()
  @IsPositive()
  AUTH_ACCESS_TOKEN_EXPIRES_IN: number;

  @IsString()
  AUTH_REFRESH_TOKEN_SECRET: string;

  @IsInt()
  @IsPositive()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: number;

  @IsBoolean()
  AUTH_COOKIES_HTTP_ONLY: boolean;

  @IsBoolean()
  AUTH_COOKIES_SECURE: boolean;

  @IsEnum(['strict', 'lax', 'none'])
  AUTH_COOKIES_SAME_SITE: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    refreshTokenExpiresIn: parseInt(
      process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN || '0',
      10,
    ),
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: parseInt(
      process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN || '0',
      10,
    ),
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    cookiesHttpOnly: process.env.AUTH_COOKIES_HTTP_ONLY === 'true',
    cookiesSecure: process.env.AUTH_COOKIES_SECURE === 'true',
    cookiesSameSite: process.env.AUTH_COOKIES_SAME_SITE as
      | 'lax'
      | 'strict'
      | 'none',
  };
});
