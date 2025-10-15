import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/decorators';
import { ApiResponse } from 'src/core/decorators';
import {
  CreateWorkOrderDiagnosticDto,
  CreateWorkOrderServiceDto,
  ResponseWorkOrderDiagnosticDto,
  ResponseWorkOrderDto,
  ResponseWorkOrderServiceDto,
} from 'src/work-orders/dto';
import {
  WorkOrderDiagnosticMapper,
  WorkOrderServiceMapper,
  WorkOrderMapper,
} from 'src/work-orders/mappers';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';

@Controller({
  version: '1',
  path: 'service-requests/:serviceRequestId/work-orders',
})
@AuthGuard()
export class ServiceRequestWorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post('diagnostics')
  @ApiResponse(200, 'Diagnostic work order created')
  async createDiagnosticWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @Body() createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    const workOrder = await this.workOrdersService.createDiagnosticWorkOrder(
      serviceRequestId,
      createDiagnosticWorkOrderDto,
      true, // TODO <- requires approval must be calculated by user permissions
    );
    console.log({ workOrder });
    return {
      workOrder: WorkOrderMapper.toResponseDto(workOrder),
    };
  }

  @Post('services')
  @ApiResponse(200, 'Service work order created')
  async createServiceWorkOrder(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @Body() createServiceWorkOrderDto: CreateWorkOrderServiceDto,
  ): Promise<{ workOrder: ResponseWorkOrderDto }> {
    const workOrder = await this.workOrdersService.createServiceWorkOrder(
      serviceRequestId,
      createServiceWorkOrderDto,
      true,
    );
    return { workOrder: WorkOrderMapper.toResponseDto(workOrder) };
  }

  // @Get()
  // @ApiResponse(200, 'Service request work orders found')
  // async findAllByServiceRequestId() {}
}
