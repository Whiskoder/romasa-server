import { plainToInstance } from 'class-transformer';

import { CustomerMapper } from 'src/customers/mappers';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { UserMapper } from 'src/users/mappers';
import { VehicleMapper } from 'src/vehicles/mappers';
import { ServiceRequest } from 'src/service-requests/entities';
import { WorkOrderMapper } from 'src/work-orders/mappers';

export class ServiceRequestMapper {
  static toResponseDto(entity: ServiceRequest): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, entity);
    if (entity.createdBy)
      dto.createdBy = UserMapper.toResponseDto(entity.createdBy);
    if (entity.updatedBy)
      dto.updatedBy = UserMapper.toResponseDto(entity.updatedBy);
    if (entity.requester)
      dto.requester = CustomerMapper.toResponseDto(entity.requester);
    if (entity.vehicle)
      dto.vehicle = VehicleMapper.toResponseDto(entity.vehicle);
    if (entity.service)
      dto.service = WorkOrderMapper.serviceToResponseDto(entity.service);
    if (entity.diagnostic)
      dto.diagnostic = WorkOrderMapper.diagnosticToResponseDto(
        entity.diagnostic,
      );

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
