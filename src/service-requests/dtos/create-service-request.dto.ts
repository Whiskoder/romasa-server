import { IsEnum, IsInt, IsPositive, IsUUID } from 'class-validator';

import { ServiceRequestPriority } from 'src/service-requests/enums';

export class CreateServiceRequestDto {
  @IsInt()
  @IsPositive()
  vehicleId: number;

  @IsUUID('7')
  customerId: string;

  @IsEnum(ServiceRequestPriority)
  priority: ServiceRequestPriority;
}
