import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';
import { ResponseServiceOperationsDto } from '@mod/service-operations/dto/response-service-operations.dto';

@Injectable()
export class ServiceOperationsMapper {
  constructor() {}

  toResponseDto(
    serviceOperationsEntity: ServiceOperations,
  ): ResponseServiceOperationsDto {
    const dto = plainToInstance(
      ResponseServiceOperationsDto,
      serviceOperationsEntity,
    );

    return dto;
  }

  toResponseDtoList(
    serviceOperationsEntities: ServiceOperations[],
  ): ResponseServiceOperationsDto[] {
    return serviceOperationsEntities.map((e) => this.toResponseDto(e));
  }
}
