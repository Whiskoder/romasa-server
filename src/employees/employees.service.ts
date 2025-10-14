import { Injectable } from '@nestjs/common';

import { EmployeeRepository } from 'src/employees/infraestructure/persistence/employee.repository';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async findById(id: number): Promise<any> {
    // TODO: add employee validations
    return this.employeeRepository.findById(id);
  }
}
