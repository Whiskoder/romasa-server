import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserRepository } from 'src/users/infraestructure/persistence/user.repository';
import { UserEntity } from 'src/users/infraestructure/persistence/relational/entities';
import { NullableType } from 'src/core/types';
import { uuidPlugin } from 'src/core/plugins';
import { UserMapper } from 'src/users/infraestructure/persistence/relational/mappers';
import { User } from 'src/users/domain';

@Injectable()
export class UserRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);

    const newEntity = this.usersRepository.create({
      ...persistenceModel,
      id: uuidPlugin.v7(),
    });
    await this.usersRepository.save(newEntity);

    return UserMapper.toDomain(newEntity);
  }

  async findByEmail(email: string): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { email },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findById(id: string): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { id },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }
}
