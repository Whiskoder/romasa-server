import { plainToInstance } from 'class-transformer';

import { WorkOrderService } from 'src/work-orders/domain';
import { ResponseWorkOrderServiceDto } from 'src/work-orders/dto';

export class ServiceWorkOrderMapper {
  static toResponseDto(
    workOrderService: WorkOrderService,
  ): ResponseWorkOrderServiceDto {
    const { workOrder, ...rest } = workOrderService;
    const dto = plainToInstance(ResponseWorkOrderServiceDto, {
      ...rest,
      ...workOrder,
    });

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderService[],
  ): ResponseWorkOrderServiceDto[] {
    return workOrders.map((workOrder) =>
      ServiceWorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
