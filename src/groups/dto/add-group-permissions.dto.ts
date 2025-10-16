import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class AddGroupPermissionsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  permissions: string[];
}
