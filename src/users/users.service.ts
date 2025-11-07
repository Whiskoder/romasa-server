import { In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NullableType } from 'src/core/types';
import { CreateUserDto } from 'src/users/dto';
import { bcryptPlugin, uuidPlugin } from 'src/core/plugins';
import {
  UserAlreadyExistsException,
  UserEmployeeNotFoundException,
} from 'src/users/exceptions';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmployeesService } from 'src/employees/employees.service';
import { User } from 'src/users/entities/user.entity';
import { Query } from 'src/core/interfaces';
import { ResponsePaginationDto } from 'src/core/dto';
import { createPagination } from 'src/core/utils';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AllConfigType } from 'src/core/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly employeeService: EmployeesService,
    private readonly cryptoService: CryptoService,
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async create(createUserDto: {
    password: string;
    email: string;
    employeeId: number;
  }): Promise<User> {
    const { email, employeeId, password } = createUserDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) throw new UserAlreadyExistsException();

    const employeeEntity = await this.employeeService.findById(employeeId);
    if (!employeeEntity) throw new UserEmployeeNotFoundException();

    const hashedPassword = bcryptPlugin.hash(password);
    const encryptedTokenSecret = this.cryptoService.generateSecret();

    const user = {
      id: uuidPlugin.v7(),
      hashedPassword,
      email,
      employee: employeeEntity,
      encryptedTokenSecret,
    };
    const entity = this.usersRepository.create(user);

    await this.usersRepository.save(entity);

    return entity;
  }

  async findAllWithPagination(
    query: Query<User>,
  ): Promise<[User[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.usersRepository.findAndCount({
      where,
      relations,
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);

    return [entities, paginationDto];
  }

  async findByEmail(
    email: string,
    relations?: string[],
  ): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { email },
      relations,
    });
    return entity ? entity : null;
  }

  async findById(
    id: string,
    relations?: string[],
  ): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { id },
      relations,
    });
    return entity ? entity : null;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const entities = await this.usersRepository.find({
      where: { id: In(ids) },
    });
    return entities ? entities : [];
  }
}
