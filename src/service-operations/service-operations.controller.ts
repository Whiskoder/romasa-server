import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
  ValidationPipe,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiResponse } from 'src/shared/decorators';
import {
  CreateDiagnosticDto,
  ResponseServiceOperationsDto,
} from 'src/service-operations/dto';
import { ServiceOperationsMapper } from 'src/service-operations/mappers';
import { ServiceOperationsService } from 'src/service-operations/service-operations.service';
import { SearchFilterAndPaginationInterceptor } from 'src/shared/interceptors';
import { AuthAccess, GetUserId } from 'src/auth/decorators';
import { Roles } from 'src/users/enums';
import { ScheduleAppointmentDto } from './dto/schedule-appointment.dto';

@Controller({
  version: '1',
  path: 'service-operations',
})
export class ServiceOperationsController {
  constructor(
    private readonly serviceOperationsService: ServiceOperationsService,
    private readonly serviceOperationsMapper: ServiceOperationsMapper,
  ) {}

  // Solo encargados de bodega pueden crear una solicitud
  @AuthAccess(Roles.warehouseManager)
  @Post()
  @ApiResponse(201, 'Service Operation created')
  async create(
    @GetUserId() userId: string,
    @Body() createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<{ serviceOperations: ResponseServiceOperationsDto[] }> {
    const serviceOperation = await this.serviceOperationsService.create(
      userId,
      createDiagnosticDto,
    );

    const serviceOperationDto =
      this.serviceOperationsMapper.toResponseDto(serviceOperation);
    return { serviceOperations: [serviceOperationDto] };
  }

  // Solo el conductor y gerente de tienda pueden aprobar
  @AuthAccess(Roles.storeManager, Roles.driver)
  @Post(':operationId/approve')
  @ApiResponse(201, 'Service Operation approved')
  async approve(
    @Param('operationId', new ParseIntPipe()) operationId: number,
    @GetUserId() userId: string,
  ): Promise<{ serviceOperations: any[] }> {
    console.log(operationId);
    const serviceOperation = await this.serviceOperationsService.approve(
      operationId,
      userId,
    );

    const serviceOperationDto =
      this.serviceOperationsMapper.toResponseDto(serviceOperation);
    return { serviceOperations: [serviceOperationDto] };
  }

  @AuthAccess(Roles.storeManager, Roles.driver)
  @Post(':operationId/reject')
  @ApiResponse(201, 'Service Operation rejected')
  async reject(
    @Param('operationId', new ParseIntPipe()) operationId: number,
    @GetUserId() userId: string,
  ): Promise<any> {}

  // Solo el personal de taller puede agendar una cita
  @AuthAccess(Roles.workshopStaff)
  @Post(':operationId/scheduleAppointment')
  @ApiResponse(201, 'Service Operation scheduled appointment')
  async scheduleAppointment(
    @Body() scheduleAppointmentDto: ScheduleAppointmentDto,
    @Param('operationId', new ParseIntPipe()) operationId: number,
    @GetUserId() userId: string,
  ): Promise<{ serviceOperations: ResponseServiceOperationsDto[] }> {
    const serviceOperation =
      await this.serviceOperationsService.scheduleAppointment(
        operationId,
        userId,
        scheduleAppointmentDto,
      );

    const serviceOperationDto =
      this.serviceOperationsMapper.toResponseDto(serviceOperation);
    return { serviceOperations: [serviceOperationDto] };
  }

  @AuthAccess(
    Roles.driver,
    Roles.warehouseManager,
    Roles.storeManager,
    Roles.workshopStaff,
  )
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<'serviceOperation'>(
      ['status', 'createdByEmployee', 'branch'],
      'serviceOperation',
    ),
  )
  @Get()
  @ApiResponse(200, 'Service Operations found')
  async findAll(
    @Req() req: Request,
  ): Promise<{ serviceOperations: ResponseServiceOperationsDto[] }> {
    const serviceOperations = await this.serviceOperationsService.findAll(
      req as any,
    );

    const serviceOperationsDtos =
      this.serviceOperationsMapper.toResponseDtoList(serviceOperations);
    return { serviceOperations: serviceOperationsDtos };
    // return serviceOperations as any;
  }
}
