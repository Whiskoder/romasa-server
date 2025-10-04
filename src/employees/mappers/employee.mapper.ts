import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { ResponseEmployeeDto } from 'src/employee/dto/response-employee.dto';
import { Employee } from 'src/employee/entities/employee.entity';

@Injectable()
export class EmployeeMapper {
  constructor() {}

  toResponseDto(employeeEntity: Employee): ResponseEmployeeDto {
    const dto = plainToInstance(ResponseEmployeeDto, employeeEntity);

    return dto;
  }

  toResponseDtoList(employeeEntities: Employee[]): ResponseEmployeeDto[] {
    return employeeEntities.map((e) => this.toResponseDto(e));
  }
}
