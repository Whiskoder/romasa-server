import { Controller, Get, Query } from '@nestjs/common';

import { ApiResponse } from '@shared/decorators/response.decorator';
import { QueryVehicleDto } from '@mod/vehicles/dto/query-vehicle.dto';
import { ResponseVehicleDto } from '@mod/vehicles/dto/response-vehicle.dto';
import { VehicleMapper } from '@mod/vehicles/mappers/vehicle.mapper';
import { VehicleService } from '@mod/vehicles/vehicle.service';

@Controller({
  version: '1',
  path: 'vehicles',
})
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly vehicleMapper: VehicleMapper,
  ) {}

  @Get()
  @ApiResponse(200, 'Vehicles found')
  async findAll(
    @Query() queryVehicleDto: QueryVehicleDto,
  ): Promise<{ vehicles: ResponseVehicleDto[] }> {
    const vehicles = await this.vehicleService.findAll(queryVehicleDto);

    const vehiclesDtos = this.vehicleMapper.toResponseDtoList(vehicles);
    return { vehicles: vehiclesDtos };
  }
}
