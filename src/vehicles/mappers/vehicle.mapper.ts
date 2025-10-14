import { plainToInstance } from 'class-transformer';
import { Vehicle } from 'src/vehicles/domain';
import { ResponseVehicleDto } from 'src/vehicles/dto';

export class VehicleMapper {
  static toResponseDto(vehicle: Vehicle): ResponseVehicleDto {
    const dto = plainToInstance(ResponseVehicleDto, vehicle);

    return dto;
  }

  static toResponseDtoList(vehicles: Vehicle[]): ResponseVehicleDto[] {
    return vehicles.map((vehicle) => VehicleMapper.toResponseDto(vehicle));
  }
}
