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

import { ServiceOperationsService } from '@mod/service-operations/service-operations.service';
import { ServiceOperationsMapper } from '@mod/service-operations/mappers/service-operations.mapper';

@Controller({
  version: '1',
  path: 'service-operations',
})
export class ServiceOperationsController {
  constructor(
    private readonly serviceOperationsService: ServiceOperationsService,
    private readonly serviceOperationsMapper: ServiceOperationsMapper,
  ) {}
}
