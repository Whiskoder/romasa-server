import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';

import { ApiResponse } from 'src/shared/decorators';
import { EmployeeMapper } from 'src/employees/mappers';
import { EmployeeService } from 'src/employees/employee.service';
import { ResponseEmployeeDto, CreateEmployeeDto } from 'src/employees/dto';
import { SearchFilterAndPaginationInterceptor } from 'src/shared/interceptors';
import { AuthAccess } from 'src/auth/decorators';
import { Roles } from 'src/users/enums';

@AuthAccess(Roles.admin)
@Controller({
  version: '1',
  path: 'employees',
})
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeeMapper: EmployeeMapper,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<'employee'>(
      ['fullName', 'rfc', 'mobile', 'employeeNumber'],
      'employee',
    ),
  )
  @Get()
  @ApiResponse(200, 'Employees found')
  async findAll(
    @Req() req: Request,
  ): Promise<{ employees: ResponseEmployeeDto[] }> {
    const employees = await this.employeeService.findAll(req as any);

    const employeesDtos = this.employeeMapper.toResponseDtoList(employees);
    return { employees: employeesDtos };
  }
}
