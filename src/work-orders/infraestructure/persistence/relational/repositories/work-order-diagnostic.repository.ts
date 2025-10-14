import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { uuidPlugin } from 'src/core/plugins';
import { WorkOrderDiagnosticEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderDiagnosticMapper } from 'src/work-orders/infraestructure/persistence/relational/mappers/work-order-diagnostic.mapper';
import { WorkOrderDiagnosticRepository } from 'src/work-orders/infraestructure/work-order-diagnostic.repository';

@Injectable()
export class WorkOrderDiagnosticRelationalRepository
  implements WorkOrderDiagnosticRepository
{
  constructor(
    @InjectRepository(WorkOrderDiagnosticEntity)
    private readonly workOrderDiagnosticRepository: Repository<WorkOrderDiagnosticEntity>,
  ) {}

  async create(data: WorkOrderDiagnostic): Promise<WorkOrderDiagnostic> {
    const persistenceModel = WorkOrderDiagnosticMapper.toPersistence(data);

    const newEntity = this.workOrderDiagnosticRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.workOrderDiagnosticRepository.save(newEntity);

    return WorkOrderDiagnosticMapper.toDomain(newEntity);
  }
}
