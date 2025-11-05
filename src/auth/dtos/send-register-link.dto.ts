import { IsEmail, IsInt, IsPositive } from 'class-validator';

export class SendRegisterLinkDto {
  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  employeeId: number;
}
