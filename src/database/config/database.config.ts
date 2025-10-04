import { registerAs } from '@nestjs/config';

import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { DatabaseConfig } from 'src/database/config/database-config.type';
import { validateConfig } from 'src/utils';

class EnvironmentVariablesValidator {
  @IsString()
  DATABASE_TYPE: string;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_PASS: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsBoolean()
  DATABASE_SSL: boolean;

  @IsBoolean()
  DATABASE_SYNC: boolean;

  @IsString()
  DATABASE_USER: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    pass: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    ssl: process.env.DATABASE_SSL === 'true',
    sync: process.env.DATABASE_SYNC === 'true',
    user: process.env.DATABASE_USER,
  };
});
