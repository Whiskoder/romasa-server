import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from 'src/employees/entities';
import { EmployeeMapper } from 'src/employees/mappers';

import { EmployeeController } from 'src/employees/employee.controller';
import { EmployeeService } from 'src/employees/employee.service';

Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeMapper],
  exports: [EmployeeService],
});
export class EmployeesModule {}
