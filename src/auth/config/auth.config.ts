import { registerAs } from '@nestjs/config';

import { IsInt, IsPositive, IsString } from 'class-validator';

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
  };
});
