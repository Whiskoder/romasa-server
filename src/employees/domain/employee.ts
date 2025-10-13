import { Gender, BloodGroup } from 'src/employees/types';

export class Employee {
  id: number;

  employeeNumber: number;

  rfc: string;

  curp: string;

  fullName: string;

  firstName: string;

  motherName: string;

  fatherName: string;

  gender: Gender;
}
