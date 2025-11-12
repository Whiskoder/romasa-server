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
  AddUsersToGroupDto,
  AddWorkOrderDiagnosticApproversDto,
  CreateGroupDto,
  ResponseGroupDto,
  UpdateGroupDto,
  UpdateGroupPermissionsDto,
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
  @ApiResponse(201, 'Grupo creado')
  async create(
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const group = await this.groupsService.create(createGroupDto);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Get(':id')
  @AuthGuard(Permissions.groups.view_all)
  @ApiResponse(200, 'Grupo encontrado')
  async findById(
    @Param('id') id: string,
  ): Promise<{ group: ResponseGroupDto }> {
    const group = await this.groupsService.findById(id, [
      'users',
      'woDiagnosticApprovers',
    ]);
    if (!group) throw new GroupNotFoundException();
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Get()
  @AuthGuard(Permissions.groups.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<Group>(
      ['id', 'name'],
      ['users', 'woDiagnosticApprovers'],
    ),
  )
  @ApiResponse(200, 'Grupos encontrados')
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
  @ApiResponse(200, 'Grupo actualizado')
  async update(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const group = await this.groupsService.update(groupId, updateGroupDto);
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Delete(':groupId')
  @AuthGuard(Permissions.groups.delete)
  @ApiResponse(200, 'Grupo eliminado')
  async delete(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
  ): Promise<void> {
    await this.groupsService.delete(groupId);
  }

  @Patch(':groupId/permissions')
  @AuthGuard(Permissions.groups.manage_permissions)
  @ApiResponse(200, 'Permisos de grupo actualizados')
  async updatePermissions(
    @Param('groupId', new ParseUUIDPipe({ version: '7' }))
    groupId: string,
    @Body() updateGroupPermisionsDto: UpdateGroupPermissionsDto,
  ): Promise<{ group: ResponseGroupDto }> {
    const { permissions } = updateGroupPermisionsDto;
    const group = await this.groupsService.updatePermissions(
      groupId,
      permissions,
    );
    return { group: GroupMapper.toResponseDto(group) };
  }

  @Post(':groupId/users')
  @AuthGuard(Permissions.groups.manage_users)
  @ApiResponse(200, 'Usuarios de grupo actualizados')
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
  @ApiResponse(200, 'Usuarios de grupo actualizados')
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
  @ApiResponse(200, 'Usuarios aprobadores de diagnóstico actualizados')
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
  @ApiResponse(200, 'Usuarios aprobadores de diagnóstico actualizados')
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
