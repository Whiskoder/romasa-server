import { IsEmail, IsString, MinLength } from 'class-validator';

export class NotificationDto {
  @IsEmail()
  to: string;

  @IsString()
  @MinLength(1)
  subject: string;

  message: any;
}
