import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleEntity } from './entities';
import { VehicleRelationalRepository } from './repositories';
import { VehicleRepository } from '../vehicle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [
    {
      provide: VehicleRepository,
      useClass: VehicleRelationalRepository,
    },
  ],
  exports: [VehicleRepository],
})
export class RelationalVehiclePersistenceModule {}
