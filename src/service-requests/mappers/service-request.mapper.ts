import { plainToInstance } from 'class-transformer';

import { CustomerMapper } from 'src/customers/mappers';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { UserMapper } from 'src/users/mappers';
import { VehicleMapper } from 'src/vehicles/mappers';
import { ServiceRequest } from 'src/service-requests/entities';
import { WorkOrderMapper } from 'src/work-orders/mappers';

export class ServiceRequestMapper {
  static toResponseDto(entity: ServiceRequest): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, {
      id: entity.id,
      trackingCode: entity.trackingCode,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy
        ? UserMapper.toResponseDto(entity.createdBy)
        : undefined,
      updatedBy: entity.updatedBy
        ? UserMapper.toResponseDto(entity.updatedBy)
        : undefined,
      requester: entity.requester
        ? CustomerMapper.toResponseDto(entity.requester)
        : undefined,
      vehicle: entity.vehicle
        ? VehicleMapper.toResponseDto(entity.vehicle)
        : undefined,
      diagnostic: entity.diagnostic
        ? WorkOrderMapper.diagnosticToResponseDto(entity.diagnostic)
        : undefined,
      service: entity.service
        ? WorkOrderMapper.serviceToResponseDto(entity.service)
        : undefined,
    });

    return dto;
  }

  static toResponseDtoList(
    entities: ServiceRequest[],
  ): ResponseServiceRequestDto[] {
    return entities.map((serviceRequest) =>
      ServiceRequestMapper.toResponseDto(serviceRequest),
    );
  }
}
