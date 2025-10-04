import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeController } from 'src/employee/employee.controller';
import { EmployeeMapper } from 'src/employee/mappers/employee.mapper';
import { EmployeeService } from 'src/employee/employee.service';

srcule({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeMapper],
  exports: [EmployeeService],
});
export class EmployeesModule {}
