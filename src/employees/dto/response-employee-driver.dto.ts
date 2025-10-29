import { ResponseEmployeeDto } from 'src/employees/dto';

export class ResponseEmployeeDriverDto extends ResponseEmployeeDto {
  licenseNumber: string;
  licenseType: string;
  licenseIssueDate: Date;
  licenseExpiryDate: Date;
}
