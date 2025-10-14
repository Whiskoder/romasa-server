import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkOrderRepository } from '../../work-order.repository';
import { WorkOrderEntity } from '../entities';

@Injectable()
export class WorkOrderRelationalRepository implements WorkOrderRepository {
  constructor(
    @InjectRepository(WorkOrderEntity)
    private readonly workOrderRepository: Repository<WorkOrderEntity>,
  ) {}
}