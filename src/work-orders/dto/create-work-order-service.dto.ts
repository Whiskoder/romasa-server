import { IsUUID } from 'class-validator';

export class CreateWorkOrderServiceDto {
  @IsUUID('7')
  workshopId: string;
}
