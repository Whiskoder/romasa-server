import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/employee/dto/update-employee.dto';
import { Employee } from 'src/employee/entities/employee.entity';
import { Query } from '@shared/interfaces/query.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  async findAll(query: Query<'employee'>): Promise<Employee[]> {
    const { limit, offset, sortBy, sortOrder } = query.pagination;
    const parameters = query.parameters;
    let where = query.where;

    const fullNameConcat = `CONCAT(
        COALESCE(employee.firstName, ''),
        ' ',
        COALESCE(employee.middleName, ''),
        ' ',
        COALESCE(employee.lastName, '')
      )`;

    if (where.match(/employee\.fullName/))
      where = where.replace('employee.fullName', fullNameConcat);

    const qb = this.employeeRepository
      .createQueryBuilder('employee')
      .where(where, parameters)
      .andWhere('employee.isSuspended = :isSuspended', { isSuspended: false })
      .andWhere('employee.isBlocked = :isBlocked', { isBlocked: false })
      .andWhere('employee.isUser = :isUser', { isUser: false });

    if (sortBy === 'fullName') {
      qb.orderBy(fullNameConcat, sortOrder);
    } else {
      qb.orderBy(`employee.${sortBy}`, sortOrder);
    }

    const employees = await qb.take(limit).skip(offset).getMany();

    if (employees.length === 0)
      throw new NotFoundException('No employees found');

    return employees;
  }

  async findById(employeeIds: number[]): Promise<Employee[]> {
    const employeeEntities = await this.employeeRepository.findBy({
      id: In(employeeIds),
      isSuspended: false,
      isBlocked: false,
      isUser: false,
    });

    if (employeeEntities.length === 0)
      throw new NotFoundException('No employees found');

    return employeeEntities;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
