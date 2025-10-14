import { Controller } from '@nestjs/common';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';

@Controller({
  version: '1',
  path: 'service-requests',
})
export class ServiceRequestsController {
  constructor(
    private readonly serviceRequestsService: ServiceRequestsService,
  ) {}
}
