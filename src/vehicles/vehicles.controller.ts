import { Controller } from '@nestjs/common';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Controller({
  version: '1',
  path: 'vehicles',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
}
