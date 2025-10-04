import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { ServiceOperation } from 'src/service-operations/entities/service-operation.entity';
import { ResponseServiceOperationsDto } from 'src/service-operations/dto/response-service-operations.dto';

@Injectable()
export class ServiceOperationsMapper {
  constructor() {}

  toResponseDto(
    serviceOperationsEntity: ServiceOperation,
  ): ResponseServiceOperationsDto {
    const dto = plainToInstance(
      ResponseServiceOperationsDto,
      serviceOperationsEntity,
    );

    dto.vehicleInventory = serviceOperationsEntity.vehicleInventory.split(',');

    return dto;
  }

  toResponseDtoList(
    serviceOperationsEntities: ServiceOperation[],
  ): ResponseServiceOperationsDto[] {
    return serviceOperationsEntities.map((e) => this.toResponseDto(e));
  }
}
