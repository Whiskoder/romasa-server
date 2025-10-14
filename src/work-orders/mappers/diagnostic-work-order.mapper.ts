import { plainToInstance } from 'class-transformer';

import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { ResponseDiagnosticWorkOrderDto } from 'src/work-orders/dto';

export class DiagnosticWorkOrderMapper {
  static toResponseDto(
    workOrderDiagnostic: WorkOrderDiagnostic,
  ): ResponseDiagnosticWorkOrderDto {
    const { workOrder, ...rest } = workOrderDiagnostic;
    const dto = plainToInstance(ResponseDiagnosticWorkOrderDto, {
      ...rest,
      ...workOrder,
    });

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderDiagnostic[],
  ): ResponseDiagnosticWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      DiagnosticWorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
