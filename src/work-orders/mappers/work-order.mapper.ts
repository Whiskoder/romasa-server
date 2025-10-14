import { plainToInstance } from 'class-transformer';

import { WorkOrder } from 'src/work-orders/domain';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';

export class WorkOrderMapper {
  static toResponseDto(workOrder: WorkOrder): ResponseWorkOrderDto {
    const dto = plainToInstance(ResponseWorkOrderDto, workOrder);
    return dto;
  }

  static toResponseDtoList(workOrders: WorkOrder[]): ResponseWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
