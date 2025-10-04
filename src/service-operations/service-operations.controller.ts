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
} from '@nestjs/common';

import { ApiResponse } from 'src/shared/decorators';
import {
  CreateDiagnosticDto,
  ResponseServiceOperationsDto,
} from 'src/service-operations/dto';
import { ServiceOperationsMapper } from 'src/service-operations/mappers';
import { ServiceOperationsService } from 'src/service-operations/service-operations.service';
import { SearchFilterAndPaginationInterceptor } from 'src/shared/interceptors';

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
  ): Promise<{ serviceOperations: ResponseServiceOperationsDto[] }> {
    const serviceOperation =
      await this.serviceOperationsService.create(createDiagnosticDto);

    const serviceOperationDto =
      this.serviceOperationsMapper.toResponseDto(serviceOperation);
    return { serviceOperations: [serviceOperationDto] };
  }

  // @UseInterceptors(
  //   new SearchFilterAndPaginationInterceptor<'service_operation_details'>(
  //     ['vehicleLicensePlate'],
  //     'service_operation_details',
  //   ),
  // )
  @UseInterceptors(
    new SearchFilterAndPaginationInterceptor<'serviceOperation'>(
      ['status'],
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
