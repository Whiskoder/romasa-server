import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { AuthGuard, GetUserId, GetUserPermissions } from 'src/auth/decorators';
import { ApiResponse } from 'src/core/decorators';
import {
  CreateWorkOrderDiagnosticDto,
  CreateWorkOrderServiceDto,
  ResponseWorkOrderDto,
} from 'src/work-orders/dto';
import { WorkOrderMapper } from 'src/work-orders/mappers';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { Permissions } from 'src/permissions/constants';
import { GetUserGroupId } from 'src/auth/decorators/get-user-group-id.decorator';

@Controller({
  version: '1',
  path: 'service-requests/:serviceRequestId/work-orders',
})
export class ServiceRequestWorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post('diagnostics')
  @ApiResponse(200, 'Orden de diagnóstico creada')
  @AuthGuard(
    Permissions.work_orders.create_with_required_approval,
    Permissions.work_orders.create_without_approval,
  )
  async createDiagnosticWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @GetUserGroupId() userGroupId: string,
    @GetUserPermissions() userPermissions: Set<string>,
    @Body() createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    const workOrder = await this.workOrdersService.createDiagnosticWorkOrder(
      serviceRequestId,
      createDiagnosticWorkOrderDto,
      userGroupId,
      userPermissions,
    );
    return {
      workOrder: WorkOrderMapper.diagnosticToResponseDto(workOrder),
    };
  }

  @Post('services')
  @ApiResponse(200, 'Orden de servicio creada')
  @AuthGuard(
    Permissions.work_orders.create_with_required_approval,
    Permissions.work_orders.create_without_approval,
  )
  async createServiceWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @GetUserGroupId() userGroupId: string,
    @GetUserPermissions() userPermissions: Set<string>,
    @Body() createServiceWorkOrderDto: CreateWorkOrderServiceDto,
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    const workOrder = await this.workOrdersService.createServiceWorkOrder(
      serviceRequestId,
      createServiceWorkOrderDto,
      userGroupId,
      userPermissions,
    );
    return { workOrder: WorkOrderMapper.serviceToResponseDto(workOrder) };
  }
}
