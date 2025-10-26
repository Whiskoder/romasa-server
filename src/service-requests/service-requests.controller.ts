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
import { ServiceRequest } from 'src/service-requests/entities';
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
  @AuthGuard(Permissions.service_requests.create)
  @ApiResponse(201, 'ServiceRequest created')
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
  @ApiResponse(200, 'ServiceRequest found')
  async findById(
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
    @Query('relations') relations: string[],
    @GetUserPermissions() userPermissions: string[],
    @GetUserId() userId: string,
  ): Promise<{ serviceRequest: ResponseServiceRequestDto }> {
    let where: FindOptionsWhere<ServiceRequest> = {};

    // TODO, solo si incluye este campo, sin incluye mas deberia se un error
    if (userPermissions.includes(Permissions.service_requests.view_own)) {
      where = { createdBy: { id: userId } };
    }

    const serviceRequest = await this.serviceRequestsService.findById(
      serviceRequestId,
      where,
      relations,
    );
    if (!serviceRequest) throw new ServiceRequestNotFoundException();
    return {
      serviceRequest: ServiceRequestMapper.toResponseDto(serviceRequest),
    };
  }

  @Get('tracking-code/:trackingCode')
  @AuthGuard(
    Permissions.service_requests.view_all,
    Permissions.service_requests.view_own,
  )
  @ApiResponse(200, 'ServiceRequest found')
  async findByTrackingCode(
    @Query('relations') relations: string,
    @Param('trackingCode') trackingCode: string,
    @GetUserPermissions() userPermissions: string[],
    @GetUserId() userId: string,
  ): Promise<{ serviceRequest: ResponseServiceRequestDto }> {
    let where: FindOptionsWhere<ServiceRequest> = {};

    if (
      !userPermissions.includes(Permissions.service_requests.view_all) &&
      userPermissions.includes(Permissions.service_requests.view_own)
    ) {
      where = { createdBy: { id: userId } };
    }

    const serviceRequest = await this.serviceRequestsService.findByTrackingCode(
      trackingCode,
      where,
      relations.split(','),
    );
    if (!serviceRequest) throw new ServiceRequestNotFoundException();
    return {
      serviceRequest: ServiceRequestMapper.toResponseDto(serviceRequest),
    };
  }

  @Get()
  @AuthGuard(Permissions.service_requests.view_all)
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<ServiceRequest>(
      ['trackingCode', 'status'],
      [
        'vehicle',
        'diagnostic',
        'service',
        'requester',
        'createdBy',
        'updatedBy',
      ],
    ),
  )
  @ApiResponse(200, 'ServiceRequests found')
  async findAll(@Req() req: Request): Promise<{
    serviceRequests: ResponseServiceRequestDto[];
    pagination: ResponsePaginationDto;
  }> {
    const [serviceRequests, pagination] =
      await this.serviceRequestsService.findAllWithPagination(req as any);

    if (!serviceRequests.length) throw new ServiceRequestNotFoundException();
    return {
      serviceRequests: ServiceRequestMapper.toResponseDtoList(serviceRequests),
      pagination,
    };
  }
}
