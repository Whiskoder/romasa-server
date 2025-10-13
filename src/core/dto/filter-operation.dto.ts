import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterOperationDto {
  @IsOptional()
  @IsString()
  eq?: string;

  @IsOptional()
  @IsString()
  like?: string;

  @IsOptional()
  @IsString()
  ilike?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gt?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lt?: number;
}
