import { WorkOrderService } from 'src/work-orders/domain';

export abstract class WorkOrderServiceRepository {
  abstract create(
    data: Omit<WorkOrderService, 'id'>,
  ): Promise<WorkOrderService>;
}
