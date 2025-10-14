import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EmployeeRepository } from 'src/employees/infraestructure/persistence/employee.repository';
import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';
import { Employee } from 'src/employees/domain';
import { NullableType } from 'src/core/types';
import { EmployeeMapper } from '../mappers';

@Injectable()
export class EmployeeRelationalRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Employee>> {
    const entity = await this.employeeRepository.findOne({
      where: { id },
    });

    return entity ? EmployeeMapper.toDomain(entity) : null;
  }
}
