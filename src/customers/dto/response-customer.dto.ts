import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseCustomerDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
