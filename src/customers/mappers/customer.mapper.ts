import { plainToInstance } from 'class-transformer';

import { ResponseCustomerDto } from 'src/customers/dto';
import { Customer } from 'src/customers/entities';
export class CustomerMapper {
  static toResponseDto(entity: Customer): ResponseCustomerDto {
    const dto = plainToInstance(ResponseCustomerDto, entity);
    return dto;
  }

  static toResponseDtoList(entities: Customer[]): ResponseCustomerDto[] {
    return entities.map((customer) => CustomerMapper.toResponseDto(customer));
  }
}
