import { FindOptionsSelect, FindOptionsWhere, Not, Repository } from 'typeorm';

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

    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const trackingCode = `F${day}${month}-${uuidPlugin.short()}`;

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

  async findById(findOpts: {
    id: string;
    where?: FindOptionsWhere<ServiceRequest>;
    relations?: string[];
    select?: FindOptionsSelect<ServiceRequest>;
  }): Promise<NullableType<ServiceRequest>> {
    const { id, where, relations, select } = findOpts;
    const entity = await this.serviceRequestsRepository.findOne({
      where: { id, ...where },
      relations,
      select: select,
    });
    return entity ? entity : null;
  }

  async optimizedFindById(
    id: string,
    where?: FindOptionsWhere<ServiceRequestView>,
  ): Promise<NullableType<ServiceRequestView>> {
    const entity = await this.view.findOne({
      where: {
        id,
        status: Not(ServiceRequestStatus.draft),
        ...where,
      },
    });
    return entity ? entity : null;
  }

  async optimizedFindByTrackingCode(
    trackingCode: string,
    where?: FindOptionsWhere<ServiceRequestView>,
  ): Promise<NullableType<ServiceRequestView>> {
    const entity = await this.view.findOne({
      where: {
        trackingCode,
        status: Not(ServiceRequestStatus.draft),
        ...where,
      },
    });
    return entity ? entity : null;
  }

  async findAllWithPagination(
    query: Query<ServiceRequestView>,
  ): Promise<[ServiceRequestView[], ResponsePaginationDto]> {
    const { where, pagination } = query;
    const { offset, limit, sortBy, sortOrder } = pagination;

    const [entities, total] = await this.view.findAndCount({
      where: {
        status: Not(ServiceRequestStatus.draft),
        ...where,
      },
      order: { [sortBy]: sortOrder },
      take: limit,
      skip: offset,
    });

    const paginationDto = createPagination(total, limit, offset);
    return [entities, paginationDto];
  }

  async updateStatus(
    id: string,
    status: ServiceRequestStatus,
  ): Promise<boolean> {
    await this.serviceRequestsRepository.update({ id }, { status });

    return true;
  }
}
