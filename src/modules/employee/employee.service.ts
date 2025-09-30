import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateEmployeeDto } from '@mod/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '@mod/employee/dto/update-employee.dto';
import { Employee } from '@mod/employee/entities/employee.entity';
import { QueryEmployeeDto } from '@mod/employee/dto/query-employee.dto';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from '@shared/constants/pagination.constant';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  // private getQueryBuilder(query: QueryEmployeeDto) {

  // }

  async findAll(query: QueryEmployeeDto): Promise<Employee[]> {
    const {
      limit = DEFAULT_PAGINATION_LIMIT,
      offset = DEFAULT_PAGINATION_OFFSET,
      likeFullName,
      likeEmployeeNumber,
      likeMobile,
      likeRFC,
    } = query;

    const fullNameConcat = `CONCAT(
        COALESCE(employee.firstName, ''),
        ' ',
        COALESCE(employee.middleName, ''),
        ' ',
        COALESCE(employee.lastName, '')
      )`;

    const queryBuilder = () => {
      // TODO: move to fn and add sortBy & orderBy
      const qb = this.employeeRepository.createQueryBuilder('employee').where({
        isSuspended: 0,
        isBlocked: 0,
        isUser: 0,
      });

      if (likeFullName) {
        qb.where(`UPPER(${fullNameConcat}) LIKE UPPER(:fullName)`, {
          fullName: `${likeFullName}%`,
        });
        qb.orderBy(fullNameConcat, 'ASC');
        return qb;
      }

      if (likeEmployeeNumber) {
        qb.where(`employee.employeeNumber LIKE :employeeNumber`, {
          employeeNumber: `${likeEmployeeNumber}%`,
        });
        qb.orderBy('employee.employeeNumber', 'ASC');
        return qb;
      }

      if (likeMobile) {
        qb.where(`employee.mobile LIKE :mobile`, {
          mobile: `${likeMobile}%`,
        });
        qb.orderBy('employee.mobile', 'ASC');
        return qb;
      }

      if (likeRFC) {
        qb.where(`UPPER(employee.rfc) LIKE UPPER(:rfc)`, {
          rfc: `${likeRFC}%`,
        });
        qb.orderBy('employee.rfc', 'ASC');
        return qb;
      }

      return qb;
    };

    const employees = await queryBuilder().take(limit).skip(offset).getMany();

    if (employees.length === 0)
      throw new NotFoundException('No employees found');

    return employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  // async findByName(name: string) {
  //   const [employees, total] = await this.employeeRepository
  //     .createQueryBuilder('employee')
  //     .where(
  //       "CONCAT(employee.firstName, ' ', employee.middleName, ' ', employee.lastName) LIKE :name",
  //       { name: `%${name}%` },
  //     )
  //     .take(50)
  //     .getManyAndCount();

  //   return {
  //     total,
  //     employees,
  //   };
  // }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
