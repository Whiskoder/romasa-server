import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';

export default new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  entities: [ServiceOperations],
  options: {
    encrypt: true,
  },
});
