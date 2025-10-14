import { plainToInstance } from 'class-transformer';

import { WorkOrderService } from 'src/work-orders/domain';
import { ResponseServiceWorkOrderDto } from 'src/work-orders/dto';

export class ServiceWorkOrderMapper {
  static toResponseDto(
    workOrderService: WorkOrderService,
  ): ResponseServiceWorkOrderDto {
    const { workOrder, ...rest } = workOrderService;
    const dto = plainToInstance(ResponseServiceWorkOrderDto, {
      ...rest,
      ...workOrder,
    });

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderService[],
  ): ResponseServiceWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      ServiceWorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
