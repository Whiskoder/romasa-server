import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ServiceRequestRepository } from '../../service-request.repository';
import { ServiceRequestEntity } from '../entities';

@Injectable()
export class ServiceRequestRelationalRepository implements ServiceRequestRepository {
  constructor(
    @InjectRepository(ServiceRequestEntity)
    private readonly serviceRequestRepository: Repository<ServiceRequestEntity>,
  ) {}

  async create(
    data: any,
  ): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAll(
    count?: boolean,
  ): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAllByRequester(
    pagination?: any,
    count?: boolean,
  ): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findAllByCreatedBy(count?: boolean): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }

  async findOneById(): Promise<any> {
    // Implementation needed
    throw new Error('Method not implemented.');
  }
}
