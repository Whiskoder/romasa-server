import { plainToInstance } from 'class-transformer';

import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { ResponseWorkOrderDiagnosticDto } from 'src/work-orders/dto';

export class DiagnosticWorkOrderMapper {
  static toResponseDto(
    workOrderDiagnostic: WorkOrderDiagnostic,
  ): ResponseWorkOrderDiagnosticDto {
    const { workOrder, ...rest } = workOrderDiagnostic;
    const dto = plainToInstance(ResponseWorkOrderDiagnosticDto, {
      ...rest,
      ...workOrder,
    });

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderDiagnostic[],
  ): ResponseWorkOrderDiagnosticDto[] {
    return workOrders.map((workOrder) =>
      DiagnosticWorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
