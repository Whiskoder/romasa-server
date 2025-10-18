import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/decorators';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { EmployeesService } from 'src/employees/employees.service';
import { Permissions } from 'src/permissions/constants';
import { Employee, EmployeeSearchView } from './entities';

@Controller({
  version: '1',
  path: 'employees',
})
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @AuthGuard(Permissions.employees.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<EmployeeSearchView>(
      ['rfc', 'employeeNumber', 'fullName'],
      [],
    ),
  )
  async findAll(@Req() request: Request) {
    const [employees, pagination] =
      await this.employeesService.findAllWithPagination(request as any);
    return { employees, pagination };
  }
}
