import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class AddWorkOrderDiagnosticApproversDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('7', { each: true })
  userIds: string[];
}
