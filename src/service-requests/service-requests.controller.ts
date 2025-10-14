import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthGuard, GetUserId } from 'src/auth/decorators';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { CreateServiceRequestDto } from 'src/service-requests/dtos';
import { ServiceRequestMapper } from 'src/service-requests/mappers';
import { ApiResponse } from 'src/core/decorators';

@Controller({
  version: '1',
  path: 'service-requests',
})
@AuthGuard()
export class ServiceRequestsController {
  constructor(
    private readonly serviceRequestsService: ServiceRequestsService,
  ) {}

  @Post()
  @ApiResponse(201, 'ServiceRequest created')
  async create(
    @Body()
    createServiceRequest: CreateServiceRequestDto,
    @GetUserId() userId: string,
  ) {
    const serviceRequest = await this.serviceRequestsService.create(
      createServiceRequest,
      userId,
    );
    return {
      serviceRequest: ServiceRequestMapper.toResponseDto(serviceRequest),
    };
  }

  @Get(':serviceRequestId')
  @ApiResponse(200, 'ServiceRequest found')
  async findOneById() {}

  @Get()
  @ApiResponse(200, 'ServiceRequests found')
  async findAll() {}
}
