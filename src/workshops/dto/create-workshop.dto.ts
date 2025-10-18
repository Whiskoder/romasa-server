import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateWorkshopDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsInt()
  @IsPositive()
  capacity: number;
}
