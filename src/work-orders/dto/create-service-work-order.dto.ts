import { IsUUID } from 'class-validator';

export class CreateServiceWorkOrderDto {
  @IsUUID('7')
  workshopId: string;
}
