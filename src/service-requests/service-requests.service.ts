import { FindOptionsWhere, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Query } from 'src/core/interfaces';
import { CreateServiceRequestDto } from 'src/service-requests/dtos';
import { CustomersService } from 'src/customers/customers.service';
import { NullableType } from 'src/core/types';
import {
  ServiceRequest,
  ServiceRequestView,
} from 'src/service-requests/entities';
import { UsersService } from 'src/users/users.service';
import { uuidPlugin } from 'src/core/plugins';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import {
  CustomerNotFoundException,
  UserNotFoundException,
  VehicleNotFoundException,
} from 'src/service-requests/exceptions';
import { ResponsePaginationDto } from 'src/core/dto';
import { createPagination } from 'src/core/utils';
import { ServiceRequestStatus } from 'src/service-requests/enums';

@Injectable()
export class ServiceRequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestsRepository: Repository<ServiceRequest>,
    @InjectRepository(ServiceRequestView)
    private readonly view: Repository<ServiceRequestView>,
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

    // TODO: Implement tracking code
    const trackingCode = uuidPlugin.short();

    const serviceRequest = {
      id: uuidPlugin.v7(),
      requester: customer,
      vehicle,
      priority,
      trackingCode,
      createdBy: user,
      updatedBy: user,
      status: ServiceRequestStatus.draft,
    };

    const entity = this.serviceRequestsRepository.create(serviceRequest);

    await this.serviceRequestsRepository.save(entity);

    return entity;
  }

  async findById(
    id: string,
    where?: FindOptionsWhere<ServiceRequest>,
    relations?: string[],
  ): Promise<NullableType<ServiceRequest>> {
    const entity = await this.serviceRequestsRepository.findOne({
      where: { id },
    });
    return entity ? entity : null;
  }

  async optimizedFindById(
    id: string,
    where?: FindOptionsWhere<ServiceRequestView>,
    relations?: string[],
  ): Promise<NullableType<ServiceRequestView>> {
    const entity = await this.view.findOne({
      where: { id },
      // relations,
    });
    return entity ? entity : null;
  }

  async findByTrackingCode(
    trackingCode: string,
    where?: FindOptionsWhere<ServiceRequestView>,
    relations?: string[],
  ): Promise<NullableType<ServiceRequestView>> {
    const entity = await this.view.findOne({
      where: { trackingCode },
      // relations,
    });
    return entity ? entity : null;
  }

  async findAllWithPagination(
    query: Query<ServiceRequestView>,
  ): Promise<[ServiceRequestView[], ResponsePaginationDto]> {
    const { where, relations, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.view.findAndCount({
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);
    return [entities, paginationDto];
  }
}
