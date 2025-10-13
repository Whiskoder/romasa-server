import { Injectable } from '@nestjs/common';

import { CustomerRepository } from 'src/customers/infraestructure/persistence/customer.repository';

@Injectable()
export class CustomersService {
  constructor(private readonly customerRepository: CustomerRepository) {}
}
