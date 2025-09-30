import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

import { ServicePriority } from '@mod/service-operations/enums/service-priority.enum';
import { VehicleInventory } from '@mod/vehicles/enums/vehicle-inventory.enum';

export class CreateDiagnosticDto {
  @Type(() => Boolean)
  @IsBoolean()
  affectsOperability: boolean;

  @IsString()
  branch: string;

  @Type(() => Number)
  @IsInt()
  createdByEmployeeId: number;

  @Type(() => Number)
  @IsInt()
  departmentManagerEmployeeId: number;

  @IsEnum(ServicePriority)
  priority: ServicePriority;

  @Type(() => Number)
  @IsInt()
  vehicleDriverEmployeeId: number;

  @IsString()
  vehicleFailure: string;

  @Type(() => Number)
  @IsInt()
  vehicleFuelLevel: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  vehicleId: number;

  @IsArray()
  @IsEnum(VehicleInventory, { each: true })
  vehicleInventory: VehicleInventory[];

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  vehicleMileage: number;
}
