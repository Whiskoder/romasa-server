import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';

import { CryptoConfig } from 'src/crypto/config/crypto-config.type';
import { validateConfig } from 'src/utils';

class EnvironmentVariablesValidator {
  @IsString()
  CRYPTO_SECRET: string;

  @IsString()
  CRYPTO_HASH_SALT: string;
}

export default registerAs<CryptoConfig>('crypto', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.CRYPTO_SECRET,
    hashSalt: process.env.CRYPTO_HASH_SALT,
  };
});
