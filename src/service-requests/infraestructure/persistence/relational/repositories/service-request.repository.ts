import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { NullableType } from 'src/core/types';
import { ServiceRequest } from 'src/service-requests/domain';
import { ServiceRequestEntity } from 'src/service-requests/infraestructure/persistence/relational/entities';
import { ServiceRequestMapper } from 'src/service-requests/infraestructure/persistence/relational/mappers/service-request.mapper';
import { ServiceRequestRepository } from 'src/service-requests/infraestructure/persistence/service-request.repository';
@Injectable()
export class ServiceRequestRelationalRepository
  implements ServiceRequestRepository
{
  constructor(
    @InjectRepository(ServiceRequestEntity)
    private readonly serviceRequestRepository: Repository<ServiceRequestEntity>,
  ) {}

  async create(data: any): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAll(count?: boolean): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAllByRequester(pagination?: any, count?: boolean): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAllByCreatedBy(count?: boolean): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findById(
    serviceRequestId: string,
  ): Promise<NullableType<ServiceRequest>> {
    const entity = await this.serviceRequestRepository.findOne({
      where: { id: serviceRequestId },
    });

    return entity ? ServiceRequestMapper.toDomain(entity) : null;
  }
}
