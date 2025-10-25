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
  @ApiResponse(200, 'Diagnostic work order created')
  @AuthGuard(
    Permissions.diagnostic_work_orders.create_with_required_approval,
    Permissions.diagnostic_work_orders.create_without_approval,
  )
  async createDiagnosticWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @Body() createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    @GetUserGroupId() userGroupId: string,
    @GetUserPermissions() userPermissions: Set<string>,
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    console.log(userPermissions);
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
  @ApiResponse(200, 'Service work order created')
  @AuthGuard(
    Permissions.service_work_orders.create_with_required_approval,
    Permissions.service_work_orders.create_without_approval,
  )
  async createServiceWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @Body() createServiceWorkOrderDto: CreateWorkOrderServiceDto,
    @GetUserPermissions() userPermissions: string[],
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    let approvalRequired = true;
    if (
      userPermissions.includes(
        Permissions.service_work_orders.create_without_approval,
      )
    ) {
      approvalRequired = false;
    }

    const workOrder = await this.workOrdersService.createServiceWorkOrder(
      serviceRequestId,
      createServiceWorkOrderDto,
      approvalRequired,
    );
    return { workOrder: WorkOrderMapper.serviceToResponseDto(workOrder) };
  }
}
