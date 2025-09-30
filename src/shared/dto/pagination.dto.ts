import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { DEFAULT_PAGINATION_LIMIT } from '@shared/constants/pagination.constant';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number;
}
