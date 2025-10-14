import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseWorkshopDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  capacity: number;
}
