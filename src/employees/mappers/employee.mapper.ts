import { plainToInstance } from 'class-transformer';
import { NullableType } from 'src/core/types';
import { Employee } from 'src/employees/domain';
import { ResponseEmployeeDto } from 'src/employees/dto';

export class EmployeeMapper {
  static toResponseDto(entity?: Employee): NullableType<ResponseEmployeeDto> {
    if (!entity) return null;

    const dto = plainToInstance(ResponseEmployeeDto, {
      id: entity.id,
      employeeNumber: entity.employeeNumber,
      fullName: entity.fullName,
      firstName: entity.firstName,
      fatherName: entity.fatherName,
      motherName: entity.motherName,
    });

    return dto;
  }

  static toResponseDtoList(
    entities: Employee[],
  ): NullableType<ResponseEmployeeDto>[] {
    return entities.map((entity) => EmployeeMapper.toResponseDto(entity));
  }
}
