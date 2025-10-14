import { Injectable } from '@nestjs/common';

import { CustomerRepository } from 'src/customers/infraestructure/persistence/customer.repository';
import { CreateCustomerDto } from 'src/customers/dto';
import { Customer } from 'src/customers/domain';
import { NullableType } from 'src/core/types';

@Injectable()
export class CustomersService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, type } = createCustomerDto;

    // TODO: check if name is unique

    return this.customerRepository.create({
      name,
      type,
    });
  }

  async findById(customerId: string): Promise<NullableType<Customer>> {
    return this.customerRepository.findById(customerId);
  }
}
