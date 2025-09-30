/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterEmployeeDto {
  @IsString()
  @IsOptional()
  likeFullName?: string;

  @IsString()
  @IsOptional()
  likeMobile?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  likeEmployeeNumber?: number;

  @IsString()
  @IsOptional()
  likeRFC?: string;
}
