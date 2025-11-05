import { registerAs } from '@nestjs/config';

import {
  IsInt,
  IsPositive,
  IsString,
  IsBoolean,
  IsEnum,
  IsIn,
} from 'class-validator';

import { AuthConfig } from 'src/auth/config/auth-config.type';
import { validateConfig } from 'src/core/utils';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_ACCESS_TOKEN_SECRET: string;

  @IsInt()
  @IsPositive()
  AUTH_ACCESS_TOKEN_EXPIRES_IN: number;

  @IsInt()
  @IsPositive()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: number;

  @IsInt()
  @IsPositive()
  AUTH_REGISTER_TOKEN_EXPIRES_IN: number;

  @IsInt()
  @IsPositive()
  AUTH_REGISTER_NONCE_EXPIRES_IN: number;

  @IsString()
  AUTH_REGISTER_TOKEN_SECRET: string;

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
    accessTokenExpiresIn: parseInt(
      process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN || '0',
      10,
    ),
    registerTokenExpiresIn: parseInt(
      process.env.AUTH_REGISTER_TOKEN_EXPIRES_IN || '0',
      10,
    ),
    registerNonceExpiresIn: parseInt(
      process.env.AUTH_REGISTER_NONCE_EXPIRES_IN || '0',
      10,
    ),
    registerTokenSecret: process.env.AUTH_REGISTER_TOKEN_SECRET,
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    cookiesHttpOnly: process.env.AUTH_COOKIES_HTTP_ONLY === 'true',
    cookiesSecure: process.env.AUTH_COOKIES_SECURE === 'true',
    cookiesSameSite: process.env.AUTH_COOKIES_SAME_SITE as
      | 'lax'
      | 'strict'
      | 'none',
  };
});
