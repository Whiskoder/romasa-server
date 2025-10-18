import { IsEnum, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEnum(['external', 'internal'])
  type: 'external' | 'internal';
}
