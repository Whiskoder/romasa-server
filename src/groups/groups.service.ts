import { Repository } from 'typeorm';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Group } from 'src/groups/entities/group.entity';
import { NullableType } from 'src/core/types';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import {
  AtLeastOnePropertyRequiredException,
  GroupAlreadyExistsEntityException,
  GroupNotFoundEntityException,
  GroupUsersNotFoundEntityException,
  GroupWorkOrderDiagnosticApproversNotFoundEntityException,
  InvalidPermissionsValueException,
  UsersNotFoundEntityException,
} from 'src/groups/exceptions';
import { uuidPlugin } from 'src/core/plugins';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Query } from 'src/core/interfaces';
import { ResponsePaginationDto } from 'src/core/dto';
import { createPagination } from 'src/core/utils';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';
import { PermissionValue } from 'src/permissions/types';
import { ALL_PERMISSIONS_VALUES } from 'src/permissions/constants';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,

    @Inject(forwardRef(() => UsersService))
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

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const { name, description } = updateGroupDto;
    if (!name && !description) throw new AtLeastOnePropertyRequiredException();
    const existingGroup = await this.findByName(name);
    if (existingGroup && existingGroup.id !== id)
      throw new GroupAlreadyExistsEntityException();

    const entity = await this.groupRepository.findOne({ where: { id } });
    if (!entity) throw new GroupNotFoundEntityException();

    const $name = name.trim().toLowerCase();
    entity.name = $name;
    const $description = description.trim().toLowerCase();
    entity.description = $description;

    return this.groupRepository.save(entity);
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
      where,
      relations,
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);

    return [entities, paginationDto];
  }

  async delete(id: string): Promise<void> {
    const entity = await this.groupRepository.findOne({ where: { id } });
    if (!entity) throw new GroupNotFoundEntityException();

    entity.users = [];
    await this.groupRepository.save(entity);
    await this.groupRepository.delete({ id });

    this.permissionCacheService.deleteGroup(id);
  }

  async updatePermissions(
    groupId: string,
    permissions: string[],
  ): Promise<Group> {
    const group = await this.getGroupOrThrow(groupId);
    const validatedPermissions = this.validatePermissions(permissions);

    return this.updateGroupPermissions(group, validatedPermissions);
  }

  private async getGroupOrThrow(groupId: string): Promise<Group> {
    const group = await this.findById(groupId, [
      'users',
      'woDiagnosticApprovers',
    ]);
    if (!group) throw new GroupNotFoundEntityException();
    return group;
  }

  private validatePermissions(permissions: string[]): PermissionValue[] {
    const invalidPermissions = permissions.filter(
      (p) => !ALL_PERMISSIONS_VALUES.includes(p),
    );

    if (invalidPermissions.length > 0) {
      throw new InvalidPermissionsValueException();
    }

    return permissions;
  }

  private async updateGroupPermissions(
    group: Group,
    permissions: PermissionValue[],
  ): Promise<Group> {
    group.permissions = permissions.join(',');
    const permissionSet = new Set(permissions);

    this.permissionCacheService.invalidateGroup(group.id, permissionSet);

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

  async addWorkOrderDiagnosticApprovers(
    groupId: string,
    userIds: string[],
  ): Promise<Group> {
    const group = await this.getGroupWithWorkOrderDiagnosticApprovers(groupId);
    const userEntities = await this.getValidUsers(userIds);

    const newUsers = this.filterNewUsers(
      group.woDiagnosticApprovers ?? [],
      userEntities,
    );
    group.woDiagnosticApprovers = [
      ...(group.woDiagnosticApprovers ?? []),
      ...newUsers,
    ];

    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  async removeWorkOrderDiagnosticApprovers(
    groupId: string,
    userIds: string[],
  ): Promise<Group> {
    const group = await this.getGroupWithWorkOrderDiagnosticApprovers(groupId);
    const userEntities = await this.getValidUsers(userIds);

    this.validateGroupHasWorkOrderDiagnosticApprovers(group);

    const userIdsToRemove = new Set(userEntities.map((u) => u.id));
    group.woDiagnosticApprovers = (group.woDiagnosticApprovers ?? []).filter(
      (user) => !userIdsToRemove.has(user.id),
    );

    this.permissionCacheService.invalidateGroup(groupId);

    return this.groupRepository.save(group);
  }

  private validateGroupHasWorkOrderDiagnosticApprovers(group: Group): void {
    if (!group.woDiagnosticApprovers?.length)
      throw new GroupWorkOrderDiagnosticApproversNotFoundEntityException();
  }

  private async getGroupWithWorkOrderDiagnosticApprovers(
    groupId: string,
  ): Promise<Group> {
    const group = await this.findById(groupId, ['woDiagnosticApprovers']);
    if (!group) throw new GroupNotFoundEntityException();
    return group;
  }
}
