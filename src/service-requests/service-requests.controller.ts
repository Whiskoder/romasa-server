import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';

import {
  AuthGuard,
  GetUser,
  GetUserId,
  GetUserPermissions,
} from 'src/auth/decorators';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import {
  CreateServiceRequestDto,
  ResponseServiceRequestDto,
} from 'src/service-requests/dtos';
import { ServiceRequestMapper } from 'src/service-requests/mappers';
import { ApiResponse } from 'src/core/decorators';
import { ServiceRequestNotFoundException } from 'src/service-requests/exceptions';
import { SearchFilterAndPaginationInterceptor } from 'src/core/interceptors';
import {
  ServiceRequest,
  ServiceRequestView,
} from 'src/service-requests/entities';
import { Permissions } from 'src/permissions/constants';
import { FindOptionsWhere } from 'typeorm';
import { ResponsePaginationDto } from 'src/core/dto';

@Controller({
  version: '1',
  path: 'service-requests',
})
export class ServiceRequestsController {
  constructor(
    private readonly serviceRequestsService: ServiceRequestsService,
  ) {}

  @Post()
  @AuthGuard(
    Permissions.work_orders.create_with_required_approval,
    Permissions.work_orders.create_without_approval,
  )
  @ApiResponse(201, 'Solicitud de servicio creada')
  async create(
    @Body()
    createServiceRequest: CreateServiceRequestDto,
    @GetUserId() userId: string,
  ): Promise<{ serviceRequest: ResponseServiceRequestDto }> {
    const serviceRequest = await this.serviceRequestsService.create(
      createServiceRequest,
      userId,
    );
    return {
      serviceRequest: ServiceRequestMapper.toResponseDto(serviceRequest),
    };
  }

  @Get('id/:serviceRequestId')
  @AuthGuard(
    Permissions.service_requests.view_all,
    Permissions.service_requests.view_own,
  )
  @ApiResponse(200, 'Solicitud de servicio encontrada')
  async findById(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @GetUserPermissions() userPermissions: Set<string>,
    @GetUserId() userId: string,
  ): Promise<{ serviceRequest: ResponseServiceRequestDto }> {
    let where: FindOptionsWhere<ServiceRequestView> = {};

    // TODO, solo si incluye este campo, sin incluye mas deberia se un error
    if (userPermissions.has(Permissions.service_requests.view_own)) {
      where = { createdBy_id: userId };
    }

    const serviceRequest = await this.serviceRequestsService.optimizedFindById(
      serviceRequestId,
      where,
    );
    if (!serviceRequest) throw new ServiceRequestNotFoundException();
    return {
      serviceRequest: ServiceRequestMapper.viewToResponseDto(serviceRequest),
    };
  }

  @Get('tracking-code/:trackingCode')
  @AuthGuard(
    Permissions.service_requests.view_all,
    Permissions.service_requests.view_own,
  )
  @ApiResponse(200, 'Solicitud de servicio encontrada')
  async findByTrackingCode(
    @Param('trackingCode') trackingCode: string,
    @GetUserPermissions() userPermissions: Set<string>,
    @GetUserId() userId: string,
  ): Promise<{ serviceRequest: ResponseServiceRequestDto }> {
    let where: FindOptionsWhere<ServiceRequestView> = {};

    if (
      !userPermissions.has(Permissions.service_requests.view_all) &&
      userPermissions.has(Permissions.service_requests.view_own)
    ) {
      where = { createdBy_id: userId };
    }

    const serviceRequest =
      await this.serviceRequestsService.optimizedFindByTrackingCode(
        trackingCode,
        where,
      );
    if (!serviceRequest) throw new ServiceRequestNotFoundException();
    return {
      serviceRequest: ServiceRequestMapper.viewToResponseDto(serviceRequest),
    };
  }

  @Get()
  @AuthGuard(Permissions.service_requests.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<ServiceRequestView>(
      ['trackingCode', 'status'],
      [],
    ),
  )
  @ApiResponse(200, 'Solicitudes de servicio encontradas')
  async findAll(@Req() req: Request): Promise<{
    serviceRequests: ResponseServiceRequestDto[];
    pagination: ResponsePaginationDto;
  }> {
    const [serviceRequests, pagination] =
      await this.serviceRequestsService.findAllWithPagination(req as any);

    if (!serviceRequests.length) throw new ServiceRequestNotFoundException();
    return {
      serviceRequests:
        ServiceRequestMapper.viewToResponseDtoList(serviceRequests),
      pagination,
    };
  }
}
