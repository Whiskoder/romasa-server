import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '1433', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  ssl: process.env.DATABASE_SSL === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  options: {
    encrypt: true,
  },
} as DataSourceOptions);
