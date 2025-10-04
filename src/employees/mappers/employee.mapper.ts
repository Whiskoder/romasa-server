import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { ResponseEmployeeDto } from 'src/employees/dto';
import { Employee } from 'src/employees/entities';

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
