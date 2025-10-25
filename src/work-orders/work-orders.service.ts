import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateWorkOrderDiagnosticDto,
  CreateWorkOrderServiceDto,
} from 'src/work-orders/dto';

import { WorkshopsService } from 'src/workshops/workshops.service';
import {
  WorkshopNotFoundException,
  ServiceRequestNotFoundException,
  EmployeeNotFoundException,
  ServiceRequestAlreadyHasAnOrderException,
  NoApproversConfiguredException,
} from 'src/work-orders/exceptions';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { EmployeesService } from 'src/employees/employees.service';
import { OrderStatus } from 'src/work-orders/enums';
import {
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/entities';
import { uuidPlugin } from 'src/core/plugins';
import { Workshop } from 'src/workshops/entities';
import { ServiceRequest } from 'src/service-requests/entities';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Permissions } from 'src/permissions/constants';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrderDiagnostic)
    private readonly workOrderDiagnosticsRepository: Repository<WorkOrderDiagnostic>,
    @InjectRepository(WorkOrderService)
    private readonly workOrderServicesRepository: Repository<WorkOrderService>,
    private readonly workshopService: WorkshopsService,
    private readonly serviceRequestService: ServiceRequestsService,
    private readonly employeesService: EmployeesService,
    // private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
  ) {}

  private async validateWorkOrderPrerequisites(
    workshopId: string,
    serviceRequestId: string,
    type: 'service' | 'diagnostic',
  ): Promise<{ workshop: Workshop; serviceRequest: ServiceRequest }> {
    const workshop = await this.workshopService.findById(workshopId);
    if (!workshop) throw new WorkshopNotFoundException();

    const serviceRequest =
      await this.serviceRequestService.findById(serviceRequestId);

    if (!serviceRequest) throw new ServiceRequestNotFoundException();

    const existingOrder =
      type === 'service' ? serviceRequest.service : serviceRequest.diagnostic;

    if (existingOrder) throw new ServiceRequestAlreadyHasAnOrderException();

    return { workshop, serviceRequest };
  }

  private createBaseWorkOrder(
    workshop: Workshop,
    serviceRequest: ServiceRequest,
    requiresApproval: boolean,
  ) {
    return {
      id: uuidPlugin.v7(),
      serviceRequest,
      workshop,
      requiresApproval,
      status: requiresApproval
        ? OrderStatus.pending_approval
        : OrderStatus.scheduled,
    };
  }

  private async determineDefaultApprovers(
    userGroupId: string,
  ): Promise<User[]> {
    const group = await this.groupsService.findById(userGroupId, [
      'workOrderDiagnosticApprovers',
    ]);
    console.log(group);
    const users = group?.workOrderDiagnosticApprovers;
    if (!users?.length) throw new NoApproversConfiguredException();
    return users;
  }

  async createDiagnosticWorkOrder(
    serviceRequestId: string,
    createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    userGroupId: string,
    userPermissions: Set<string>,
  ): Promise<WorkOrderDiagnostic> {
    const { workshopId, reportedByDriverId, reportedSymptoms, ...rest } =
      createDiagnosticWorkOrderDto;

    let requiresApproval = true;
    if (
      userPermissions.has(
        Permissions.service_work_orders.create_without_approval,
      )
    ) {
      requiresApproval = false;
    }

    let approversRequired: User[] = [];
    if (requiresApproval) {
      approversRequired = await this.determineDefaultApprovers(userGroupId);
    }

    const { workshop, serviceRequest } =
      await this.validateWorkOrderPrerequisites(
        workshopId,
        serviceRequestId,
        'diagnostic',
      );

    const employee = await this.employeesService.findById(reportedByDriverId);
    if (!employee) throw new EmployeeNotFoundException();

    const workOrderBase = this.createBaseWorkOrder(
      workshop,
      serviceRequest,
      requiresApproval,
    );

    const workOrderDiagnostic = {
      ...rest,
      ...workOrderBase,
      reportedSymptoms: reportedSymptoms.join(','),
      reportedByDriver: employee,
      approversRequired,
    };

    const entity =
      this.workOrderDiagnosticsRepository.create(workOrderDiagnostic);

    await this.workOrderDiagnosticsRepository.save(entity);

    return entity;
  }

  async createServiceWorkOrder(
    serviceRequestId: string,
    createServiceWorkOrderDto: CreateWorkOrderServiceDto,
    requiresApproval: boolean,
  ): Promise<WorkOrderService> {
    const { workshopId } = createServiceWorkOrderDto;

    const { workshop, serviceRequest } =
      await this.validateWorkOrderPrerequisites(
        workshopId,
        serviceRequestId,
        'service',
      );

    const workOrderService = this.createBaseWorkOrder(
      workshop,
      serviceRequest,
      requiresApproval,
    );

    const entity = this.workOrderServicesRepository.create(workOrderService);

    await this.workOrderServicesRepository.save(entity);

    return entity;
  }
}
