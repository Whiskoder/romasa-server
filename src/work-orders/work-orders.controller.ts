import { WorkOrdersService } from 'src/work-orders/work-orders.service';

export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}
}