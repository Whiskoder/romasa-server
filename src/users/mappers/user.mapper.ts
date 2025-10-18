import { plainToInstance } from 'class-transformer';
import { EmployeeMapper } from 'src/employees/mappers';
import { GroupMapper } from 'src/groups/mappers';

import { ResponseUserDto } from 'src/users/dto';
import { User } from 'src/users/entities';

export class UserMapper {
  static toResponseDto(entity: User): ResponseUserDto {
    const dto = plainToInstance(ResponseUserDto, {
      id: entity.id,
      email: entity.email,
      isActive: entity.isActive,
      employee: entity.employee
        ? EmployeeMapper.toResponseDto(entity.employee)
        : undefined,
      group: entity.group ? GroupMapper.toResponseDto(entity.group) : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });

    return dto;
  }

  static toResponseDtoList(entities: User[]): ResponseUserDto[] {
    return entities.map((user) => this.toResponseDto(user));
  }
}
