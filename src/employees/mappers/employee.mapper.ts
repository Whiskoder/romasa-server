import { plainToInstance } from 'class-transformer';

import { Employee } from 'src/employees/entities';
import { ResponseEmployeeDto } from 'src/employees/dto';

export class EmployeeMapper {
  static toResponseDto(entity: Employee | any): ResponseEmployeeDto {
    const dto = plainToInstance(ResponseEmployeeDto, {
      id: entity.id,
      employeeNumber: entity.employeeNumber,
      // fullName: entity.fullName,
      firstName: entity.firstName,
      fatherName: entity.fatherName,
      motherName: entity.motherName,
      licenseNumber: entity.licenseNumber,
      licenseType: entity.licenseType,
      licenseIssueDate: entity.licenseIssueDate,
      licenseExpiryDate: entity.licenseExpiryDate,
      userId: entity.userId,
    });

    return dto;
  }

  static toResponseDtoList(entities: Employee[]): ResponseEmployeeDto[] {
    return entities.map((entity) => EmployeeMapper.toResponseDto(entity));
  }
}
