import { Injectable } from '@nestjs/common';

import { ServiceRequestRepository } from './infraestructure/persistence/service-request.repository';

@Injectable()
export class ServiceRequestsService {
  constructor(private readonly serviceRequestRepository: ServiceRequestRepository) {}
}
