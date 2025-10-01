import { IsEnum, IsOptional } from 'class-validator';

import { ServiceStatus } from '@mod/service-operations/enums/service-status.enum';

export class FilterServiceOperationsDto {
  @IsOptional()
  @IsEnum(ServiceStatus)
  equalStatus: ServiceStatus;
}
