import { Module } from '@nestjs/common';

import { RelationalEmployeePersistenceModule } from 'src/employees/infraestructure/persistence/relational/relational-persistence.module';
import { EmployeesController } from 'src/employees/employees.controller';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  imports: [RelationalEmployeePersistenceModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService, RelationalEmployeePersistenceModule],
})
export class EmployeesModule {}
