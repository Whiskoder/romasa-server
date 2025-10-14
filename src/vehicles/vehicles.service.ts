import { Injectable } from '@nestjs/common';

import { VehicleRepository } from './infraestructure/persistence/vehicle.repository';
import { NullableType } from 'src/core/types';
import { Vehicle } from 'src/vehicles/domain';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async findById(vehicleId: number): Promise<NullableType<Vehicle>> {
    return this.vehicleRepository.findById(vehicleId);
  }
}
