import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthGuard, GetUserId } from 'src/auth/decorators';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { CreateServiceRequestDto } from 'src/service-requests/dtos';
import { ServiceRequestMapper } from 'src/service-requests/mappers';

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
  async findOneById() {}

  @Get()
  async findAll() {}
}
