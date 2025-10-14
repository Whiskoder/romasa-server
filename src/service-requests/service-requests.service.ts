import { Injectable } from '@nestjs/common';

import { ServiceRequestRepository } from './infraestructure/persistence/service-request.repository';
import { NullableType } from 'src/core/types';
import { ServiceRequest } from 'src/service-requests/domain';
import { CustomersService } from 'src/customers/customers.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import {
  CustomerNotFoundException,
  UserNotFoundException,
  VehicleNotFoundException,
} from 'src/service-requests/exceptions';
import { CreateServiceRequestDto } from 'src/service-requests/dtos';
import { uuidPlugin } from 'src/core/plugins';
import { User } from 'src/users/domain';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ServiceRequestsService {
  constructor(
    private readonly serviceRequestRepository: ServiceRequestRepository,
    private readonly customersService: CustomersService,
    private readonly vehiclesService: VehiclesService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createServiceRequestDto: CreateServiceRequestDto,
    userId: string,
  ): Promise<ServiceRequest> {
    const { vehicleId, customerId, priority } = createServiceRequestDto;

    const customer = await this.customersService.findById(customerId);
    if (!customer) throw new CustomerNotFoundException();

    const vehicle = await this.vehiclesService.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundException();

    const user = await this.usersService.findById(userId);
    if (!user) throw new UserNotFoundException();

    const trackingCode = uuidPlugin.short();

    return this.serviceRequestRepository.create({
      requester: customer,
      vehicle,
      priority,
      trackingCode,
      createdBy: user,
      updatedBy: user,
    });
  }

  findById(serviceRequestId: string): Promise<NullableType<ServiceRequest>> {
    return this.serviceRequestRepository.findById(serviceRequestId);
  }
}
