import { plainToInstance } from 'class-transformer';
import { ResponseEmployeeDto } from '../dto/response-employee.dto';
import { Employee } from '../entities/employee.entity';
import { Injectable } from '@nestjs/common';

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
