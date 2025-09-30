import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseEmployeeDto {
  @Expose()
  id: string;

  @Expose()
  employeeNumber: number;

  @Expose()
  rfc: string;

  @Expose()
  curp: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;
}
