import { Injectable } from '@nestjs/common';

import { WorkOrderRepository } from './infraestructure/persistence/work-order.repository';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly workOrderRepository: WorkOrderRepository) {}
}