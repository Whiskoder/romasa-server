import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from 'src/core/decorators';
import { GroupsService } from 'src/groups/groups.service';
import {
  AddGroupPermissionsDto,
  AddUsersToGroupDto,
  AddWorkOrderDiagnosticApproversDto,
  CreateGroupDto,
  ResponseGroupDto,
} from 'src/groups/dto';
import { GroupMapper } from './mappers';
import { AuthGuard } from 'src/auth/decorators';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import { Group } from 'src/groups/entities/group.entity';
import { GroupNotFoundException } from 'src/groups/exceptions';
import { ResponsePaginationDto } from 'src/core/dto';
import { Permissions } from 'src/permissions/constants';

@Controller({
  version: '1',
  path: 'groups',
})
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @AuthGuard(Permissions.groups.create)
  @ApiResponse(201, 'Group created')
  async create(
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const group = await this.groupsService.create(createGroupDto);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Get()
  @AuthGuard(Permissions.groups.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<Group>(
      ['id', 'name'],
      ['users', 'workOrderDiagnosticApprovers'],
    ),
  )
  @ApiResponse(200, 'Groups found')
  async findAll(@Req() request: Request): Promise<{
    groups: ResponseGroupDto[];
    pagination: ResponsePaginationDto;
  }> {
    const [groups, pagination] = await this.groupsService.findAllWithPagination(
      request as any,
    );
    if (!groups.length) throw new GroupNotFoundException();
    return { groups: GroupMapper.toResponseDtoList(groups), pagination };
  }

  @Patch(':groupId')
  @AuthGuard(Permissions.groups.update)
  @ApiResponse(200, 'Group updated')
  async updateName(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() updateGroupDto: CreateGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { name } = updateGroupDto;
    const group = await this.groupsService.updateName(groupId, name);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Delete(':groupId')
  @AuthGuard(Permissions.groups.delete)
  @ApiResponse(200, 'Group deleted')
  async delete(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
  ): Promise<void> {
    await this.groupsService.delete(groupId);
  }

  @Post(':groupId/permissions')
  @AuthGuard(Permissions.groups.manage_permissions)
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
  @AuthGuard(Permissions.groups.manage_permissions)
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
  @AuthGuard(Permissions.groups.manage_users)
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
  @AuthGuard(Permissions.groups.manage_users)
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

  @Post(':groupId/work-order-diagnostic/approvers')
  @AuthGuard(Permissions.groups.manage_work_order_diagnostic_approvers)
  @ApiResponse(200, 'Users added to group')
  async addWorkOrderDiagnosticApprovers(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body()
    addWorkOrderDiagnosticApproversDto: AddWorkOrderDiagnosticApproversDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { userIds } = addWorkOrderDiagnosticApproversDto;
    const group = await this.groupsService.addWorkOrderDiagnosticApprovers(
      groupId,
      userIds,
    );
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Delete(':groupId/work-order-diagnostic/approvers')
  @AuthGuard(Permissions.groups.manage_work_order_diagnostic_approvers)
  @ApiResponse(200, 'Users removed from group')
  async removeWorkOrderDiagnosticApprovers(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body()
    addWorkOrderDiagnosticApproversDto: AddWorkOrderDiagnosticApproversDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { userIds } = addWorkOrderDiagnosticApproversDto;
    const group = await this.groupsService.removeWorkOrderDiagnosticApprovers(
      groupId,
      userIds,
    );
    return { group: GroupMapper.toResponseDto(group) };
  }
}
