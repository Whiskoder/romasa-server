import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseVehicleDto {
  @Expose()
  id: number;
}
