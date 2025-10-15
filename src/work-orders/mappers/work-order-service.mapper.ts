import { plainToInstance } from 'class-transformer';

import { WorkOrderService } from 'src/work-orders/domain';
import { ResponseWorkOrderServiceDto } from 'src/work-orders/dto';

export class WorkOrderServiceMapper {
  static toResponseDto(
    workOrderService: WorkOrderService,
  ): ResponseWorkOrderServiceDto {
    const dto = plainToInstance(ResponseWorkOrderServiceDto, {
      id: workOrderService.id,
      fuelLevelAtReception: workOrderService.fuelLevelAtReception,
      mileageAtReception: workOrderService.mileageAtReception,
      receivedInventoryItems: workOrderService.receivedInventoryItems || [],
      visualInspection: {
        roof: workOrderService.roofObservations || [],
        front: workOrderService.frontObservations || [],
        leftSide: workOrderService.leftSideObservations || [],
        rightSide: workOrderService.rightSideObservations || [],
        rear: workOrderService.rearObservations || [],
      },
      workPerformed: workOrderService.performedServices
        ? {
            services: workOrderService.performedServices || [],
            replacementParts: workOrderService.installedReplacementParts || [],
            fluids: workOrderService.addedFluids || [],
          }
        : undefined,
    });

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderService[],
  ): ResponseWorkOrderServiceDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderServiceMapper.toResponseDto(workOrder),
    );
  }
}
