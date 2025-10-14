import { forwardRef, Module } from '@nestjs/common';

import { RelationalWorkOrderPersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { WorkOrdersController } from 'src/work-orders/work-orders.controller';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { ServiceRequestsModule } from 'src/service-requests/service-requests.module';
import { WorkshopsModule } from 'src/workshops/workshops.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    RelationalWorkOrderPersistenceModule,
    forwardRef(() => ServiceRequestsModule),
    WorkshopsModule,
    EmployeesModule,
  ],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService, RelationalWorkOrderPersistenceModule],
})
export class WorkOrdersModule {}
