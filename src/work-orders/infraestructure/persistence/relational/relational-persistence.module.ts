import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  WorkOrderEntity,
  WorkOrderDiagnosticEntity,
  WorkOrderServiceEntity,
} from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderRelationalRepository } from 'src/work-orders/infraestructure/persistence/relational/repositories/work-order.repository';
import { WorkOrderServiceRelationalRepository } from 'src/work-orders/infraestructure/persistence/relational/repositories/work-order-service.repository';
import { WorkOrderDiagnosticRelationalRepository } from 'src/work-orders/infraestructure/persistence/relational/repositories/work-order-diagnostic.repository';
import { WorkOrderRepository } from 'src/work-orders/infraestructure/work-order.repository';
import { WorkOrderDiagnosticRepository } from 'src/work-orders/infraestructure/work-order-diagnostic.repository';
import { WorkOrderServiceRepository } from 'src/work-orders/infraestructure/work-order-service.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkOrderEntity,
      WorkOrderDiagnosticEntity,
      WorkOrderServiceEntity,
    ]),
  ],
  providers: [
    {
      provide: WorkOrderRepository,
      useClass: WorkOrderRelationalRepository,
    },
    {
      provide: WorkOrderDiagnosticRepository,
      useClass: WorkOrderDiagnosticRelationalRepository,
    },
    {
      provide: WorkOrderServiceRepository,
      useClass: WorkOrderServiceRelationalRepository,
    },
  ],
  exports: [
    WorkOrderRepository,
    WorkOrderDiagnosticRepository,
    WorkOrderServiceRepository,
  ],
})
export class RelationalWorkOrderPersistenceModule {}
