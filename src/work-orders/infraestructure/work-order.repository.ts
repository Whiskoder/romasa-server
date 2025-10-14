import { WorkOrder } from 'src/work-orders/domain';

export abstract class WorkOrderRepository {
  abstract create(data: Omit<WorkOrder, 'id'>): Promise<WorkOrder>;
}
