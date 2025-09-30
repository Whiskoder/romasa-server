import { IsOptional, IsString } from 'class-validator';

export class FilterVehicleDto {
  @IsString()
  @IsOptional()
  likeLicensePlate?: string;
}
