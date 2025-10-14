import { Injectable } from '@nestjs/common';

import { VehicleRepository } from './infraestructure/persistence/vehicle.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
}
