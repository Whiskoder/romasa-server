import { Injectable } from '@nestjs/common';

import { EmployeeRepository } from 'src/employees/infraestructure/persistence/employee.repository';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
}
