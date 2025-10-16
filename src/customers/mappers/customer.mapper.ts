import { plainToInstance } from 'class-transformer';

import { ResponseCustomerDto } from 'src/customers/dto';
import { Customer } from 'src/customers/entities';
export class CustomerMapper {
  static toResponseDto(entity: Customer): ResponseCustomerDto {
    const dto = plainToInstance(ResponseCustomerDto, {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
    return dto;
  }

  static toResponseDtoList(entities: Customer[]): ResponseCustomerDto[] {
    return entities.map((customer) => CustomerMapper.toResponseDto(customer));
  }
}
