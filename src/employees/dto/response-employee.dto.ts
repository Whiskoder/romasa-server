import { Exclude, Expose } from 'class-transformer';

import * as types from 'src/employees/types';

@Exclude()
export class ResponseEmployeeDto {
  @Expose()
  id: number;

  @Expose()
  employeeNumber: number;

  @Expose()
  rfc: string;

  @Expose()
  curp: string;

  @Expose()
  fullName: string;

  @Expose()
  firstName: string;

  @Expose()
  motherName: string;

  @Expose()
  fatherName: string;

  @Expose()
  gender: types.Gender;
}
