import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CustomerRepository } from 'src/customers/infraestructure/persistence/customer.repository';
import { CustomerEntity } from 'src/customers/infraestructure/persistence/relational/entities';

@Injectable()
export class CustomerRelationalRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}
}
