export type Gender = 'male' | 'female';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+';

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

  bloodGroup: BloodGroup;
}
