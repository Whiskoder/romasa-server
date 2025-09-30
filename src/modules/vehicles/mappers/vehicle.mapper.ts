import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';
import { ResponseVehicleDto } from '@mod/vehicles/dto/response-vehicle.dto';

@Injectable()
export class VehicleMapper {
  toResponseDto(vehicleEntity: Vehicle): ResponseVehicleDto {
    const dto = plainToInstance(ResponseVehicleDto, vehicleEntity);

    return dto;
  }

  toResponseDtoList(vehicleEntities: Vehicle[]): ResponseVehicleDto[] {
    return vehicleEntities.map((e) => this.toResponseDto(e));
  }
}
