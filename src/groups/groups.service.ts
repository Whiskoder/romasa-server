import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Group } from 'src/groups/entities';
import { NullableType } from 'src/core/types';
import { CreateGroupDto } from './dto';
import {
  GroupAlreadyExistsException,
  GroupNotFoundException,
  GroupUsersNotFoundException,
  UsersNotFoundException,
} from 'src/groups/exceptions';
import { uuidPlugin } from 'src/core/plugins';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly usersService: UsersService,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const { name } = createGroupDto;

    const $name = name.trim().toLowerCase();

    const existingGroup = await this.findByName($name);
    if (existingGroup) throw new GroupAlreadyExistsException();

    const group = { id: uuidPlugin.v7(), name: $name };

    const entity = this.groupRepository.create(group);
    await this.groupRepository.save(entity);

    return entity;
  }

  async findById(id: string): Promise<NullableType<Group>> {
    const entity = await this.groupRepository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findByName(name: string): Promise<NullableType<Group>> {
    const entity = await this.groupRepository.findOne({ where: { name } });
    return entity ? entity : null;
  }

  async findAll(): Promise<[Group[], number]> {
    // TODO: temporal
    const [entities, total] = await this.groupRepository.findAndCount();

    return [entities, total];
  }

  async delete(id: string): Promise<void> {
    const entity = await this.groupRepository.findOne({ where: { id } });
    if (!entity) throw new GroupNotFoundException();
    await this.groupRepository.delete({ id });
  }

  async addPermissions(groupId: string, permissions: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }

  async removePermissions(
    groupId: string,
    permissions: string,
  ): Promise<Group> {
    throw new Error('Method not implemented.');
  }

  async addUsers(groupId: string, userIds: string[]): Promise<Group> {
    const group = await this.findById(groupId);
    if (!group) throw new GroupNotFoundException();

    const userEntities = await this.usersService.findByIds(userIds);
    if (!userEntities.length) throw new UsersNotFoundException();

    if (!group.users?.length) {
      group.users = userEntities;
    } else {
      group.users = group.users.concat(userEntities);
    }

    await this.groupRepository.save(group);

    return group;
  }

  async removeUsers(groupId: string, userIds: string[]): Promise<Group> {
    const group = await this.findById(groupId);
    if (!group) throw new GroupNotFoundException();

    const userEntities = await this.usersService.findByIds(userIds);
    if (!userEntities.length) throw new UsersNotFoundException();

    if (!group.users.length) throw new GroupUsersNotFoundException();
    group.users = group.users.filter((user) => !userEntities.includes(user));

    await this.groupRepository.save(group);

    return group;
  }
}
