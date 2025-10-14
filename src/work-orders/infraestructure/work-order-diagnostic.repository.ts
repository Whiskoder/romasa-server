import { WorkOrderDiagnostic } from 'src/work-orders/domain';

export abstract class WorkOrderDiagnosticRepository {
  abstract create(
    data: Omit<WorkOrderDiagnostic, 'id'>,
  ): Promise<WorkOrderDiagnostic>;
}
