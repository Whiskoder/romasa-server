import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';

@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperations)
    private readonly serviceOperationsRepository: Repository<ServiceOperations>,
  ) {}

  create() {
    return 'This action create new service order';
  }
}
