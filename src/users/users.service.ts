import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UserRepository } from 'src/users/infraestructure/persistence/user.repository';
import { User } from 'src/users/domain';
import { NullableType } from 'src/core/types';
import { CreateUserDto } from 'src/users/dto';
import { bcryptPlugin } from 'src/core/plugins';
import {
  UserAlreadyExistsException,
  UserEmployeeNotFoundException,
} from 'src/users/exceptions';
import { CryptoService } from 'src/crypto/crypto.service';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly employeeService: EmployeesService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, employeeId } = createUserDto;

    const userObject = await this.userRepository.findByEmail(email);
    if (userObject) throw new UserAlreadyExistsException();

    const employeeObject = await this.employeeService.findById(employeeId);
    if (!employeeObject) throw new UserEmployeeNotFoundException();

    const hashedPassword = bcryptPlugin.hash(password);
    const encryptedTokenSecret = this.cryptoService.generateSecret();

    return this.userRepository.create({
      hashedPassword,
      email,
      employee: employeeObject,
      encryptedTokenSecret,
    });
  }

  findByEmail(email: string): Promise<NullableType<User>> {
    return this.userRepository.findByEmail(email);
  }

  findById(id: string): Promise<NullableType<User>> {
    return this.userRepository.findById(id);
  }
}
