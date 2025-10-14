import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkOrderEntity, WorkOrderDiagnosticEntity, WorkOrderServiceEntity } from './entities';
import { WorkOrderRelationalRepository } from './repositories';
import { WorkOrderRepository } from '../work-order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrderEntity, WorkOrderDiagnosticEntity, WorkOrderServiceEntity])],
  providers: [
    {
      provide: WorkOrderRepository,
      useClass: WorkOrderRelationalRepository,
    },
  ],
  exports: [WorkOrderRepository],
})
export class RelationalWorkOrderPersistenceModule {}