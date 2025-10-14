import { plainToInstance } from 'class-transformer';

import { ResponseCustomerDto } from 'src/customers/dto';
import { Customer } from 'src/customers/domain';

export class CustomerMapper {
  static toResponseDto(customer: Customer): ResponseCustomerDto {
    const dto = plainToInstance(ResponseCustomerDto, customer);
    return dto;
  }

  static toResponseDtoList(customers: Customer[]): ResponseCustomerDto[] {
    return customers.map((customer) => CustomerMapper.toResponseDto(customer));
  }
}
