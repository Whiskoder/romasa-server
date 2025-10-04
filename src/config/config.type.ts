import { AppConfig } from 'src/config/app-config.type';
import { AuthConfig } from 'src/auth/config/auth-config.type';
import { CryptoConfig } from 'src/crypto/config/crypto-config.type';
import { DatabaseConfig } from 'src/database/config/database-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  crypto: CryptoConfig;
};
