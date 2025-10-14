import { Module } from '@nestjs/common';

import { RelationalVehiclePersistenceModule } from 'src/vehicles/infraestructure/persistence/relational/relational-persistence.module';
import { VehiclesController } from 'src/vehicles/vehicles.controller';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Module({
  imports: [RelationalVehiclePersistenceModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService, RelationalVehiclePersistenceModule],
})
export class VehicleModule {}
