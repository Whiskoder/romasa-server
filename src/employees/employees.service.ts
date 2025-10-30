import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Employee, EmployeeSearchView } from 'src/employees/entities';
import { NullableType } from 'src/core/types';
import { ResponsePaginationDto } from 'src/core/dto';
import { Query } from 'src/core/interfaces';
import { createPagination } from 'src/core/utils';
import { EmployeeDriverView } from './entities/employee-driver-view.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
    @InjectRepository(EmployeeSearchView)
    private readonly employeeSearchViewRepository: Repository<EmployeeSearchView>,
    @InjectRepository(EmployeeDriverView)
    private readonly employeeDriverViewRepository: Repository<EmployeeDriverView>,
  ) {}

  async findById(id: number): Promise<NullableType<Employee>> {
    const entity = await this.employeesRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async driversFindAllWithPagination(
    query: Query<EmployeeDriverView>,
  ): Promise<[EmployeeDriverView[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] =
      await this.employeeDriverViewRepository.findAndCount({
        where,
        relations,
        order: { [sortBy]: sortOrder, id: 'ASC' },
        take: limit,
        skip: offset,
      });

    const paginationDto = createPagination(total, limit, offset);

    return [entities, paginationDto];
  }

  async findAllWithPagination(
    query: Query<EmployeeSearchView>,
  ): Promise<[EmployeeSearchView[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] =
      await this.employeeSearchViewRepository.findAndCount({
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
