import { IntersectionType } from '@nestjs/mapped-types';

import { PaginationDto } from '@shared/dto/pagination.dto';

import { FilterEmployeeDto } from '@mod/employee/dto/filter-employee.dto';

export class QueryEmployeeDto extends IntersectionType(
  FilterEmployeeDto,
  PaginationDto,
) {}
