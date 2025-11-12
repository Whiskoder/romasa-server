import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SendRegisterLinkDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members: MemberDto[];

  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}

export class MemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  employeeId: number;
}
