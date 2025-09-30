import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from '@mod/employee/entities/employee.entity';
import { EmployeeController } from '@mod/employee/employee.controller';
import { EmployeeMapper } from '@mod/employee/mappers/employee.mapper';
import { EmployeeService } from '@mod/employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeMapper],
})
export class EmployeeModule {}
