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

import { ApiResponse } from '@shared/decorators/response.decorator';
import { CreateEmployeeDto } from '@mod/employee/dto/create-employee.dto';
import { EmployeeMapper } from '@mod/employee/mappers/employee.mapper';
import { EmployeeService } from '@mod/employee/employee.service';
import { ResponseEmployeeDto } from '@mod/employee/dto/response-employee.dto';
import { UpdateEmployeeDto } from '@mod/employee/dto/update-employee.dto';
import { SearchFilterAndPaginationInterceptor } from '@shared/interceptors/search-filter-and-pagination.interceptor';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
