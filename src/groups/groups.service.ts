import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Group } from 'src/groups/entities';
import { NullableType } from 'src/core/types';
import { CreateGroupDto } from './dto';
import {
  GroupAlreadyExistsEntityException,
  GroupNotFoundEntityException,
  GroupUsersNotFoundEntityException,
  UsersNotFoundEntityException,
} from 'src/groups/exceptions';
import { uuidPlugin } from 'src/core/plugins';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';
import { Query } from 'src/core/interfaces';
import { ResponsePaginationDto } from 'src/core/dto';
import { createPagination } from 'src/core/utils';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly usersService: UsersService,
    private readonly permissionCacheService: PermissionCacheService,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const { name } = createGroupDto;

    const $name = name.trim().toLowerCase();

    const existingGroup = await this.findByName($name);
    if (existingGroup) throw new GroupAlreadyExistsEntityException();

    const group = { id: uuidPlugin.v7(), name: $name };

    const entity = this.groupRepository.create(group);
    await this.groupRepository.save(entity);

    return entity;
  }

  async findById(
    id: string,
    relations?: string[],
  ): Promise<NullableType<Group>> {
    const entity = await this.groupRepository.findOne({
      where: { id },
      relations,
    });
    return entity ? entity : null;
  }

  async findByName(name: string): Promise<NullableType<Group>> {
    const entity = await this.groupRepository.findOne({ where: { name } });
    return entity ? entity : null;
  }

  async findAll(relations?: string[]): Promise<Group[]> {
    const entities = await this.groupRepository.find({ relations });

    return entities ? entities : [];
  }

  async findAllWithPagination(
    query: Query<Group>,
  ): Promise<[Group[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;

    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.groupRepository.findAndCount({
      order: { [sortBy]: sortOrder },
      relations,
      take: limit,
      skip: offset,
      where,
    });

    const paginationDto = createPagination(total, limit, offset);

    return [entities, paginationDto];
  }

  async delete(id: string): Promise<void> {
    const entity = await this.groupRepository.findOne({ where: { id } });
    if (!entity) throw new GroupNotFoundEntityException();

    this.permissionCacheService.invalidateGroup(id);
    await this.groupRepository.delete({ id });
  }

  // TODO: validate if permissions exist
  async addPermissions(groupId: string, permissions: string[]): Promise<Group> {
    const group = await this.findById(groupId);
    if (!group) throw new GroupNotFoundEntityException();

    const groupPermissions = (group.permissions ?? '').split(',');
    const groupPermissionsSet = new Set([...groupPermissions, ...permissions]);

    group.permissions = Array.from(groupPermissionsSet).join(',');
    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  async removePermissions(
    groupId: string,
    permissions: string[],
  ): Promise<Group> {
    const group = await this.findById(groupId);
    if (!group) throw new GroupNotFoundEntityException();

    const permissionsToRemove = new Set(permissions);
    group.permissions = (group.permissions ?? '')
      .split(',')
      .filter((permission) => !permissionsToRemove.has(permission))
      .join(',');

    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  async addUsers(groupId: string, userIds: string[]): Promise<Group> {
    const group = await this.getGroupWithUsers(groupId);
    const userEntities = await this.getValidUsers(userIds);

    const newUsers = this.filterNewUsers(group.users ?? [], userEntities);
    group.users = [...(group.users ?? []), ...newUsers];

    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  async removeUsers(groupId: string, userIds: string[]): Promise<Group> {
    const group = await this.getGroupWithUsers(groupId);
    const userEntities = await this.getValidUsers(userIds);

    this.validateGroupHasUsers(group);

    const userIdsToRemove = new Set(userEntities.map((u) => u.id));
    group.users = (group.users ?? []).filter(
      (user) => !userIdsToRemove.has(user.id),
    );

    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  private async getGroupWithUsers(groupId: string): Promise<Group> {
    const group = await this.findById(groupId, ['users']);
    if (!group) throw new GroupNotFoundEntityException();
    return group;
  }

  private async getValidUsers(userIds: string[]): Promise<User[]> {
    const userEntities = await this.usersService.findByIds(userIds);
    if (!userEntities.length) throw new UsersNotFoundEntityException();
    return userEntities;
  }

  private filterNewUsers(existingUsers: User[], newUsers: User[]): User[] {
    const existingUserIds = new Set(existingUsers.map((u) => u.id));
    return newUsers.filter((user) => !existingUserIds.has(user.id));
  }

  private validateGroupHasUsers(group: Group): void {
    if (!group.users?.length) throw new GroupUsersNotFoundEntityException();
  }
}
