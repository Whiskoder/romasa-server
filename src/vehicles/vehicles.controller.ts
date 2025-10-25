import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/decorators';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Permissions } from 'src/permissions/constants';

import { VehicleMapper } from 'src/vehicles/mappers';
import { ResponseVehicleDto } from 'src/vehicles/dto';
import { VehicleNotFoundException } from 'src/vehicles/exceptions';
import { ApiResponse } from 'src/core/decorators';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { Vehicle } from 'src/vehicles/entities';
import { ResponsePaginationDto } from 'src/core/dto';

@Controller({
  version: '1',
  path: 'vehicles',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('id/:vehicleId')
  @AuthGuard(Permissions.vehicles.view_all)
  @ApiResponse(200, 'Vehiculo encontrado')
  async findById(
    @Param('vehicleId', new ParseIntPipe())
    vehicleId: number,
  ): Promise<{ vehicle: ResponseVehicleDto }> {
    const vehicle = await this.vehiclesService.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundException();
    return { vehicle: VehicleMapper.toResponseDto(vehicle) };
  }

  @Get()
  @AuthGuard(Permissions.vehicles.view_all)
  @ApiResponse(200, 'Lista de vehiculos')
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<Vehicle>(['licensePlate'], []),
  )
  async findAll(@Req() req: Request): Promise<{
    vehicles: ResponseVehicleDto[];
    pagination: ResponsePaginationDto;
  }> {
    const [vehicles, pagination] =
      await this.vehiclesService.findAllWithPagination(req as any);
    if (!vehicles.length) throw new VehicleNotFoundException();
    return { vehicles: VehicleMapper.toResponseDtoList(vehicles), pagination };
  }
}
