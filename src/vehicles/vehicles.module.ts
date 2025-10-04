import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehicleController } from 'src/vehicles/vehicle.controller';
import { VehicleMapper } from 'src/vehicles/mappers/vehicle.mapper';
import { VehicleService } from 'src/vehicles/vehicle.service';

srcule({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleMapper],
  exports: [VehicleService],
});
export class VehiclesModule {}
