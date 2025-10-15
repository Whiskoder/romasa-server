import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Employee } from 'src/employees/entities';
import { NullableType } from 'src/core/types';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async findById(id: number): Promise<NullableType<Employee>> {
    const entity = await this.employeesRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }
}
