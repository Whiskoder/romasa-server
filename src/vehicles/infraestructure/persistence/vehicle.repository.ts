import { NullableType } from 'src/core/types';
import { Vehicle } from 'src/vehicles/domain';

export abstract class VehicleRepository {
  abstract findById(id: number): Promise<NullableType<Vehicle>>;
}
