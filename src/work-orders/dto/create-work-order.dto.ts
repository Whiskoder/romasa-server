import { IsBoolean, IsUUID } from 'class-validator';

export class CreateWorkOrderDto {
  @IsUUID('7')
  workshopId: string;

  @IsUUID('7')
  serviceRequestId: string;

  @IsBoolean()
  requiresApproval: boolean;
}
