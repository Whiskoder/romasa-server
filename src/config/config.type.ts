import { AuthConfig } from 'src/auth/config/auth-config.type';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { AppConfig } from 'src/config/app-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};
