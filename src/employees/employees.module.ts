import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesController } from 'src/employees/employees.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee } from 'src/employees/entities';
import { EmployeeSearchView } from 'src/employees/entities';
import { EmployeeDriver } from './entities/employee-driver.entity';
import { EmployeeDriverView } from './entities/employee-driver-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeSearchView,
      EmployeeDriver,
      EmployeeDriverView,
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
