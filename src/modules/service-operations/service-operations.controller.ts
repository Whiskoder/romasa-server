import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ApiResponse } from '@shared/decorators/response.decorator';
import { CreateDiagnosticDto } from '@mod/service-operations/dto/create-diagnostic.dto';
import { ResponseServiceOperationsDto } from '@mod/service-operations/dto/response-service-operations.dto';
import { ServiceOperationsMapper } from '@mod/service-operations/mappers/service-operations.mapper';
import { ServiceOperationsService } from '@mod/service-operations/service-operations.service';
import { QueryServiceOperationsDto } from '@mod/service-operations/dto/query-service-operations.dto';

@Controller({
  version: '1',
  path: 'service-operations',
})
export class ServiceOperationsController {
  constructor(
    private readonly serviceOperationsService: ServiceOperationsService,
    private readonly serviceOperationsMapper: ServiceOperationsMapper,
  ) {}

  @Post()
  @ApiResponse(201, 'Service Operation created')
  async create(
    @Body() createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<{ serviceOperation: ResponseServiceOperationsDto[] }> {
    const serviceOperation =
      await this.serviceOperationsService.create(createDiagnosticDto);

    const serviceOperationDto =
      this.serviceOperationsMapper.toResponseDto(serviceOperation);
    return { serviceOperation: [serviceOperationDto] };
  }

  @Get()
  @ApiResponse(200, 'Service Operations found')
  async findAll(
    @Query() queryServiceOperationsDto: QueryServiceOperationsDto,
  ): Promise<{ serviceOperations: ResponseServiceOperationsDto[] }> {
    const serviceOperations = await this.serviceOperationsService.findAll(
      queryServiceOperationsDto,
    );

    const serviceOperationsDtos =
      this.serviceOperationsMapper.toResponseDtoList(serviceOperations);
    return { serviceOperations: serviceOperationsDtos };
  }
}
