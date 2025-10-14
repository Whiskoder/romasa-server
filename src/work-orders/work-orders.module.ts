import { Module } from '@nestjs/common';

import { RelationalWorkOrderPersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { WorkOrdersController } from 'src/work-orders/work-orders.controller';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';

@Module({
  imports: [RelationalWorkOrderPersistenceModule],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService, RelationalWorkOrderPersistenceModule],
})
export class WorkOrdersModule {}
