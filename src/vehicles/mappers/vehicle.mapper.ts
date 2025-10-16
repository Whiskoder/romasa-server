import { plainToInstance } from 'class-transformer';

import { ResponseVehicleDto } from 'src/vehicles/dto';
import { Vehicle } from 'src/vehicles/entities';

export class VehicleMapper {
  static toResponseDto(entity: Vehicle): ResponseVehicleDto {
    const dto = plainToInstance(ResponseVehicleDto, {
      id: entity.id,
    });
    return dto;
  }

  static toResponseDtoList(entities: Vehicle[]): ResponseVehicleDto[] {
    return entities.map((vehicle) => VehicleMapper.toResponseDto(vehicle));
  }
}
