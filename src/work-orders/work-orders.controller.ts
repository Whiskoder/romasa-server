import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { AuthGuard, GetUserId } from 'src/auth/decorators';
import { ApiResponse } from 'src/core/decorators';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';

@Controller({
  version: '1',
  path: 'work-orders',
})
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  // @Get(':id')
  // async findOne(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string,) {
  //   return await this.workOrdersService.findOne(id);
  // }

  // // ===== Approval =====
  @ApiResponse(200, 'Orden de trabajo aprobada')
  @AuthGuard()
  @Patch(':id/approve/diagnostic')
  async updateApproval(
    @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,
    @GetUserId() userId: string,
    // @Body() dto: ApprovalActionDto,
  ): Promise<boolean> {
    return await this.workOrdersService.approve(id, userId);
  }

  // @Get(':id/approval')
  // async getApproval(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string,) {
  //   return await this.workOrdersService.getApprovalStatus(id);
  // }

  // // ===== Schedule =====
  // @Patch(':id/schedule')
  // async schedule(
  //   @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,,
  //   @Body() dto: ScheduleWorkOrderDto,
  // ) {
  //   return await this.workOrdersService.schedule(id, dto);
  // }

  // // ===== Diagnostic =====
  // @Patch(':id/diagnostic')
  // async completeDiagnostic(
  //   @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,,
  //   @Body() dto: CompleteDiagnosticDto,
  // ) {
  //   return await this.workOrdersService.completeDiagnostic(id, dto);
  // }

  // @Get(':id/diagnostic')
  // async getDiagnostic(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string,) {
  //   return await this.workOrdersService.getDiagnostic(id);
  // }

  // // ===== Service - Reception =====
  // @Patch(':id/service/reception')
  // async receiveVehicle(
  //   @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,,
  //   @Body() dto: VehicleReceptionDto,
  // ) {
  //   return await this.workOrdersService.receiveVehicle(id, dto);
  // }

  // @Get(':id/service/reception')
  // async getReception(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string,) {
  //   return await this.workOrdersService.getReception(id);
  // }

  // // ===== Service - Completion =====
  // @Patch(':id/service/completion')
  // async completeService(
  //   @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,,
  //   @Body() dto: ServiceCompletionDto,
  // ) {
  //   return await this.workOrdersService.completeService(id, dto);
  // }

  // @Get(':id/service/completion')
  // async getCompletion(@Param('id', new ParseUUIDPipe({ version: '7' })) id: string,) {
  //   return await this.workOrdersService.getCompletion(id);
  // }
}
