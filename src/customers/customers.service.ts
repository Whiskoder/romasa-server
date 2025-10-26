import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCustomerDto } from 'src/customers/dto';
import { NullableType } from 'src/core/types';
import { Customer } from 'src/customers/entities';
import { CustomerAlreadyExistsException } from 'src/customers/exceptions';
import { uuidPlugin } from 'src/core/plugins';
import { createPagination } from 'src/core/utils';
import { ResponsePaginationDto } from 'src/core/dto';
import { Query } from 'src/core/interfaces';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, type } = createCustomerDto;

    const existingCustomer = await this.findByName(name);
    if (existingCustomer) throw new CustomerAlreadyExistsException();

    const customer = { id: uuidPlugin.v7(), name, type };

    const entity = this.customerRepository.create(customer);
    await this.customerRepository.save(entity);

    return entity;
  }

  async findById(id: string): Promise<NullableType<Customer>> {
    const entity = await this.customerRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findByName(name: string): Promise<NullableType<Customer>> {
    const entity = await this.customerRepository.findOne({ where: { name } });
    return entity ? entity : null;
  }

  async findAllWithPagination(
    query: Query<Customer>,
  ): Promise<[Customer[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.customerRepository.findAndCount({
      where,
      relations,
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);
    return [entities, paginationDto];
  }
}
