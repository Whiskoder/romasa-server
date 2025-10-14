import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { uuidPlugin } from 'src/core/plugins';
import { WorkOrder } from 'src/work-orders/domain';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderMapper } from 'src/work-orders/infraestructure/persistence/relational/mappers/work-order.mapper';
import { WorkOrderRepository } from 'src/work-orders/infraestructure/work-order.repository';

@Injectable()
export class WorkOrderRelationalRepository implements WorkOrderRepository {
  constructor(
    @InjectRepository(WorkOrderEntity)
    private readonly workOrderRepository: Repository<WorkOrderEntity>,
  ) {}

  async create(data: WorkOrder): Promise<WorkOrder> {
    const persistenceModel = WorkOrderMapper.toPersistence(data);

    const newEntity = this.workOrderRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.workOrderRepository.save(newEntity);

    return WorkOrderMapper.toDomain(newEntity);
  }
}
