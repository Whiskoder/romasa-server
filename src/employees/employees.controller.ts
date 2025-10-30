import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/decorators';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { EmployeesService } from 'src/employees/employees.service';
import { Permissions } from 'src/permissions/constants';
import { EmployeeSearchView } from './entities';
import { EmployeeDriverView } from './entities/employee-driver-view.entity';
import { ApiResponse } from 'src/core/decorators';

@Controller({
  version: '1',
  path: 'employees',
})
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('drivers')
  @ApiResponse(200, 'Lista de empleados enconrtada')
  @AuthGuard(Permissions.employees.view_all, Permissions.employees.view_drivers)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<EmployeeDriverView>(
      ['rfc', 'employeeNumber', 'fullName'],
      [],
    ),
  )
  async findAllWithEmployeeDriver(@Req() request: Request) {
    const [employees, pagination] =
      await this.employeesService.driversFindAllWithPagination(request as any);
    return { employees, pagination };
  }

  @Get()
  @ApiResponse(200, 'Lista de empleados enconrtada')
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
