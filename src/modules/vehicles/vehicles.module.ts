import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';
import { VehicleController } from '@mod/vehicles/vehicle.controller';
import { VehicleMapper } from '@mod/vehicles/mappers/vehicle.mapper';
import { VehicleService } from '@mod/vehicles/vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleMapper],
})
export class VehiclesModule {}
