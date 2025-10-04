import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';

import { ApiResponse } from '@shared/decorators/response.decorator';
import { ResponseVehicleDto } from 'src/vehicles/dto/response-vehicle.dto';
import { VehicleMapper } from 'src/vehicles/mappers/vehicle.mapper';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { SearchFilterAndPaginationInterceptor } from '@shared/interceptors/search-filter-and-pagination.interceptor';

@Controller({
  version: '1',
  path: 'vehicles',
})
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly vehicleMapper: VehicleMapper,
  ) {}

  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<'vehicle'>(
      ['licensePlate'],
      'vehicle',
    ),
  )
  @Get()
  @ApiResponse(200, 'Vehicles found')
  async findAll(
    @Req() req: Request,
  ): Promise<{ vehicles: ResponseVehicleDto[] }> {
    const vehicles = await this.vehicleService.findAll(req as any);

    const vehiclesDtos = this.vehicleMapper.toResponseDtoList(vehicles);
    return { vehicles: vehiclesDtos };
  }
}
