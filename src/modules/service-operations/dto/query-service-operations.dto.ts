import { IntersectionType } from '@nestjs/mapped-types';

import { FilterServiceOperationsDto } from '@mod/service-operations/dto/filter-service-operations.dto';
import { PaginationDto } from '@shared/dto/pagination.dto';

export class QueryServiceOperationsDto extends IntersectionType(
  FilterServiceOperationsDto,
  PaginationDto,
) {}
