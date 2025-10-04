import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';

import { ApiResponse } from 'src/shared/decorators';
import { ResponseVehicleDto } from 'src/vehicles/dto';
import { SearchFilterAndPaginationInterceptor } from 'src/shared/interceptors';
import { VehicleMapper } from 'src/vehicles/mappers';
import { VehicleService } from 'src/vehicles/vehicle.service';
import { AuthAccess } from 'src/auth/decorators';
import { Roles } from 'src/users/enums';

@AuthAccess(Roles.admin)
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
