import { IntersectionType } from '@nestjs/mapped-types';

import { FilterVehicleDto } from '@mod/vehicles/dto/filter-vehicle.dto';
import { PaginationDto } from '@shared/dto/pagination.dto';

export class QueryVehicleDto extends IntersectionType(
  FilterVehicleDto,
  PaginationDto,
) {}
