import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from 'src/vehicles/entities';
import { VehicleController } from 'src/vehicles/vehicle.controller';
import { VehicleMapper } from 'src/vehicles/mappers';
import { VehicleService } from 'src/vehicles/vehicle.service';

Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleMapper],
  exports: [VehicleService],
});
export class VehiclesModule {}
