import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CustomerRepository } from 'src/customers/infraestructure/persistence/customer.repository';
import { CustomerEntity } from 'src/customers/infraestructure/persistence/relational/entities';
import { Customer } from 'src/customers/domain';
import { CustomersMapper } from 'src/customers/infraestructure/persistence/relational/mappers/customers.mapper';
import { uuidPlugin } from 'src/core/plugins';
import { NullableType } from 'src/core/types';

@Injectable()
export class CustomerRelationalRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const persistenceModel = CustomersMapper.toPersistence(data);

    const newEntity = this.customerRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.customerRepository.save(newEntity);

    return CustomersMapper.toDomain(newEntity);
  }

  async findById(id: string): Promise<NullableType<Customer>> {
    const entity = await this.customerRepository.findOne({
      where: { id },
    });

    return entity ? CustomersMapper.toDomain(entity) : null;
  }
}
