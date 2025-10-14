import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkOrderService } from 'src/work-orders/domain';
import { uuidPlugin } from 'src/core/plugins';
import { WorkOrderServiceEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderServiceMapper } from 'src/work-orders/infraestructure/persistence/relational/mappers/work-order-service.mapper';
import { WorkOrderServiceRepository } from 'src/work-orders/infraestructure/work-order-service.repository';

@Injectable()
export class WorkOrderServiceRelationalRepository
  implements WorkOrderServiceRepository
{
  constructor(
    @InjectRepository(WorkOrderServiceEntity)
    private readonly workOrderServiceRepository: Repository<WorkOrderServiceEntity>,
  ) {}

  async create(data: WorkOrderService): Promise<WorkOrderService> {
    const persistenceModel = WorkOrderServiceMapper.toPersistence(data);

    const newEntity = this.workOrderServiceRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.workOrderServiceRepository.save(newEntity);

    return WorkOrderServiceMapper.toDomain(newEntity);
  }
}
