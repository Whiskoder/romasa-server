import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ServiceOperations } from '@mod/service-operations/entities/service-operations.entity';
import { CreateDiagnosticDto } from '@mod/service-operations/dto/create-diagnostic.dto';

@Injectable()
export class ServiceOperationsService {
  constructor(
    @InjectRepository(ServiceOperations)
    private readonly serviceOperationsRepository: Repository<ServiceOperations>,
  ) {}

  create(createDiagnosticDto: CreateDiagnosticDto): Promise<ServiceOperations> {
    return createDiagnosticDto as any;
  }
}
