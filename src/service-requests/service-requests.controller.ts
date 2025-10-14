import { ServiceRequestsService } from 'src/service-requests/service-requests.service';

export class ServiceRequestsController {
  constructor(private readonly serviceRequestsService: ServiceRequestsService) {}
}
