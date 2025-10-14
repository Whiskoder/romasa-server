import { plainToInstance } from 'class-transformer';
import { CustomerMapper } from 'src/customers/mappers';
import { ServiceRequest } from 'src/service-requests/domain';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';
import { UserMapper } from 'src/users/mappers';
import { VehicleMapper } from 'src/vehicles/mappers';

export class ServiceRequestMapper {
  static toResponseDto(
    serviceRequest: ServiceRequest,
  ): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, serviceRequest);

    if (serviceRequest.createdBy)
      dto.createdBy = UserMapper.toResponseDto(serviceRequest.createdBy);
    if (serviceRequest.updatedBy)
      dto.updatedBy = UserMapper.toResponseDto(serviceRequest.updatedBy);
    if (serviceRequest.requester)
      dto.requester = CustomerMapper.toResponseDto(serviceRequest.requester);
    if (serviceRequest.vehicle)
      dto.vehicle = VehicleMapper.toResponseDto(serviceRequest.vehicle);

    return dto;
  }

  static toResponseDtoList(
    serviceRequests: ServiceRequest[],
  ): ResponseServiceRequestDto[] {
    return serviceRequests.map((serviceRequest) =>
      ServiceRequestMapper.toResponseDto(serviceRequest),
    );
  }
}
