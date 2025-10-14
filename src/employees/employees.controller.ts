import { Controller } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';

@Controller({
  version: '1',
  path: 'employees',
})
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
}
