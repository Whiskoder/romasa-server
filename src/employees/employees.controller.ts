import { EmployeesService } from 'src/employees/employees.service';

export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
}
