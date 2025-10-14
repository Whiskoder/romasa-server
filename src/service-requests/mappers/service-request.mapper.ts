import { plainToInstance } from 'class-transformer';
import { ServiceRequest } from 'src/service-requests/domain';
import { ResponseServiceRequestDto } from 'src/service-requests/dtos';

export class ServiceRequestMapper {
  static toResponseDto(
    serviceRequest: ServiceRequest,
  ): ResponseServiceRequestDto {
    const dto = plainToInstance(ResponseServiceRequestDto, serviceRequest);
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
