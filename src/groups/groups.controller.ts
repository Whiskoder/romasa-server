import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from 'src/core/decorators';
import { GroupsService } from 'src/groups/groups.service';
import {
  AddGroupPermissionsDto,
  AddUsersToGroupDto,
  CreateGroupDto,
  ResponseGroupDto,
} from './dto';
import { GroupMapper } from './mappers';
import { AuthGuard } from 'src/auth/decorators';

@Controller({
  version: '1',
  path: 'groups',
})
@AuthGuard()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiResponse(201, 'Group created')
  async create(
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const group = await this.groupsService.create(createGroupDto);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Get()
  @ApiResponse(200, 'Groups found')
  async findAll(): Promise<{ groups: ResponseGroupDto[]; total: number }> {
    const [groups, total] = await this.groupsService.findAll();
    return { groups: GroupMapper.toResponseDtoList(groups), total };
  }

  @Delete(':groupId')
  @ApiResponse(204, 'Group deleted')
  async delete(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
  ): Promise<void> {
    await this.groupsService.delete(groupId);
  }

  @Post(':groupId/permissions')
  @ApiResponse(200, 'Group updated')
  async update(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() addGroupPermisionsDto: AddGroupPermissionsDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { permissions } = addGroupPermisionsDto;
    const group = await this.groupsService.addPermissions(groupId, permissions);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Delete(':groupId/permissions')
  @ApiResponse(200, 'Group permissions removed')
  async removePermissions(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() deleteGroupPermissionsDto: AddGroupPermissionsDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { permissions } = deleteGroupPermissionsDto;
    const group = await this.groupsService.removePermissions(
      groupId,
      permissions,
    );
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Post(':groupId/users')
  @ApiResponse(200, 'Users added to group')
  async addUser(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { userIds } = addUsersToGroupDto;
    const group = await this.groupsService.addUsers(groupId, userIds);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Delete(':groupId/users')
  @ApiResponse(200, 'Users removed from group')
  async removeUser(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { userIds } = addUsersToGroupDto;
    const group = await this.groupsService.removeUsers(groupId, userIds);
    return { group: GroupMapper.toResponseDto(group) };
  }
}
