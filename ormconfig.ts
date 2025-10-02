import 'dotenv/config';
import { DataSource } from 'typeorm';

import { ServiceOperation } from '@mod/service-operations/entities/service-operation.entity';
import { Employee } from '@mod/employee/entities/employee.entity';
import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';

export default new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  entities: [ServiceOperation, Employee, Vehicle],
  options: {
    encrypt: true,
  },
});
