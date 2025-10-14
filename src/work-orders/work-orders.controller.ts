import { Controller } from '@nestjs/common';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';

@Controller({
  version: '1',
  path: 'work-orders',
})
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}
}
