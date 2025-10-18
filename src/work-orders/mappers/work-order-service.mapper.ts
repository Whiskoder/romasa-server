import { plainToInstance } from 'class-transformer';

import { WorkOrderService } from 'src/work-orders/entities';
import { ResponseWorkOrderServiceDto } from 'src/work-orders/dto';

export class WorkOrderServiceMapper {
  static toResponseDto(entity: WorkOrderService): ResponseWorkOrderServiceDto {
    const dto = plainToInstance(ResponseWorkOrderServiceDto, {
      id: entity.id,
      fuelLevelAtReception: entity.fuelLevelAtReception,
      mileageAtReception: entity.mileageAtReception,
      receivedInventoryItems: entity.receivedInventoryItems || [],
      visualInspection: {
        roof: entity.roofObservations || [],
        front: entity.frontObservations || [],
        leftSide: entity.leftSideObservations || [],
        rightSide: entity.rightSideObservations || [],
        rear: entity.rearObservations || [],
      },
      workPerformed: entity.performedServices
        ? {
            services: entity.performedServices || [],
            replacementParts: entity.installedReplacementParts || [],
            fluids: entity.addedFluids || [],
          }
        : undefined,
    });

    return dto;
  }

  static toResponseDtoList(
    entities: WorkOrderService[],
  ): ResponseWorkOrderServiceDto[] {
    return entities.map((workOrder) =>
      WorkOrderServiceMapper.toResponseDto(workOrder),
    );
  }
}
