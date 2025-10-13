import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EmployeeRepository } from 'src/employees/infraestructure/persistence/employee.repository';
import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';

@Injectable()
export class EmployeeRelationalRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}
}
