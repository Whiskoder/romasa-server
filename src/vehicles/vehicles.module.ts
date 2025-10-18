import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesController } from 'src/vehicles/vehicles.controller';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Vehicle } from 'src/vehicles/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
