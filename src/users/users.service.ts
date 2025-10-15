import { Repository } from 'typeorm';

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
import { User } from 'src/users/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly employeeService: EmployeesService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, employeeId } = createUserDto;

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

  async findByEmail(email: string): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({ where: { email } });
    return entity ? entity : null;
  }

  async findById(id: string): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }
}
