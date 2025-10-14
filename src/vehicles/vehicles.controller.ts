import { VehiclesService } from 'src/vehicles/vehicles.service';

export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
}
