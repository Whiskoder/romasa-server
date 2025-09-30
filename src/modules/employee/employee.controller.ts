/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { ApiResponse } from '@shared/decorators/response.decorator';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { ResponseEmployeeDto } from './dto/response-employee.dto';
import { EmployeeMapper } from './mappers/employee.mapper';

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

  @Get()
  @ApiResponse(200, 'Employees found')
  async findAll(
    @Query() queryEmployeeDto: QueryEmployeeDto,
  ): Promise<{ employees: ResponseEmployeeDto[] }> {
    const employees = await this.employeeService.findAll(queryEmployeeDto);

    const employeesDtos = this.employeeMapper.toResponseDtoList(employees);
    return { employees: employeesDtos };
  }

  // @ApiResponse(200, 'Employees found')
  // @Get(':name')
  // findByName(@Param('name') name: string) {
  //   return this.employeeService.findByName(name);
  // }

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
