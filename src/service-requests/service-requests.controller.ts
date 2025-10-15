import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

import { AuthGuard, GetUserId } from 'src/auth/decorators';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { CreateServiceRequestDto } from 'src/service-requests/dtos';
import { ServiceRequestMapper } from 'src/service-requests/mappers';
import { ApiResponse } from 'src/core/decorators';
import { ServiceRequestNotFoundException } from 'src/service-requests/exceptions';

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
  async findById(
    @Query('relations', new ParseArrayPipe({ items: String }))
    relations: string[],
    @Param('serviceRequestId', new ParseUUIDPipe({ version: '7' }))
    serviceRequestId: string,
  ) {
    const serviceRequest = await this.serviceRequestsService.findById(
      serviceRequestId,
      relations,
    );
    if (!serviceRequest) throw new ServiceRequestNotFoundException();
    return {
      serviceRequest: ServiceRequestMapper.toResponseDto(serviceRequest),
    };
  }

  @Get()
  @ApiResponse(200, 'ServiceRequests found')
  async findAll() {}
}
