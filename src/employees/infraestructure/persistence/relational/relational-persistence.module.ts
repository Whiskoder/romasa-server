import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';
import { EmployeeRelationalRepository } from 'src/employees/infraestructure/persistence/relational/repositories';
import { EmployeeRepository } from 'src/employees/infraestructure/persistence/employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  providers: [
    {
      provide: EmployeeRepository,
      useClass: EmployeeRelationalRepository,
    },
  ],
  exports: [EmployeeRepository],
})
export class RelationalEmployeePersistenceModule {}
