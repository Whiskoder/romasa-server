import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { User } from 'src/users/entities/user.entity';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { EmployeeMapper } from 'src/employees/mappers';

@Injectable()
export class UserMapper {
  constructor(private readonly employeeMapper: EmployeeMapper) {}

  toResponseDto(userEntity: User): ResponseUserDto {
    const dto = plainToInstance(ResponseUserDto, userEntity);

    if (userEntity.employee)
      dto.employee = this.employeeMapper.toResponseDto(userEntity.employee);

    return dto;
  }

  toResponseDtoList(userEntities: User[]): ResponseUserDto[] {
    return userEntities.map((e) => this.toResponseDto(e));
  }
}
