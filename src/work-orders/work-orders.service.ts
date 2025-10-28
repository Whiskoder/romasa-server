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
  WorkOrderNotFoundEntityException,
  WorkOrderAlreadyProcessedException,
  UserIsNotApproverException,
  UserAlreadyApprovedException,
  InvalidWorkOrderTypeException,
  WorkOrderNotFoundException,
} from 'src/work-orders/exceptions';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { EmployeesService } from 'src/employees/employees.service';
import { OrderStatus } from 'src/work-orders/enums';
import {
  WorkOrder,
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/entities';
import { uuidPlugin } from 'src/core/plugins';
import { Workshop } from 'src/workshops/entities';
import { ServiceRequest } from 'src/service-requests/entities';
import { User } from 'src/users/entities/user.entity';
import { Permissions } from 'src/permissions/constants';
import { GroupsService } from 'src/groups/groups.service';
import { NullableType } from 'src/core/types';
import { UsersService } from 'src/users/users.service';
import { WorkOrderType } from 'src/work-orders/types';

@Injectable()
export class WorkOrdersService {
  private readonly repositoryMap: Map<WorkOrderType, Repository<WorkOrder>>;

  constructor(
    @InjectRepository(WorkOrderDiagnostic)
    private readonly workOrderDiagnosticsRepository: Repository<WorkOrderDiagnostic>,
    @InjectRepository(WorkOrderService)
    private readonly workOrderServicesRepository: Repository<WorkOrderService>,
    private readonly workshopService: WorkshopsService,
    private readonly serviceRequestService: ServiceRequestsService,
    private readonly employeesService: EmployeesService,
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
  ) {
    this.repositoryMap = new Map([
      [
        'diagnostic',
        this.workOrderDiagnosticsRepository as Repository<WorkOrder>,
      ],
      ['service', this.workOrderServicesRepository as Repository<WorkOrder>],
    ]);
  }

  private getRepository(type: WorkOrderType): Repository<WorkOrder> {
    const repository = this.repositoryMap.get(type);
    if (!repository) throw new InvalidWorkOrderTypeException(type);
    return repository;
  }

  async findById<T extends WorkOrder>(
    id: string,
    type: WorkOrderType,
    relations?: string[],
  ): Promise<NullableType<T>> {
    const repository = this.getRepository(type);
    const entity = await repository.findOne({
      where: { id },
      relations,
    });
    return entity ? (entity as T) : null;
  }

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
  ): Promise<{ users: User[]; minimumApprovalsRequired: number }> {
    const group = await this.groupsService.findById(userGroupId, [
      'woDiagnosticApprovers',
    ]);
    const minimumApprovalsRequired =
      group?.woDiagnosticMinimumApprovalsRequired;
    if (!minimumApprovalsRequired) throw new NoApproversConfiguredException();
    const users = group?.woDiagnosticApprovers;
    if (!users?.length) throw new NoApproversConfiguredException();
    return { users, minimumApprovalsRequired };
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
        Permissions.diagnostic_work_orders.create_without_approval,
      )
    ) {
      requiresApproval = false;
    }

    let approversRequired: User[] = [];
    let minimumApprovalsRequired: number = 1;
    if (requiresApproval) {
      const res = await this.determineDefaultApprovers(userGroupId);
      approversRequired = res.users;
      minimumApprovalsRequired = res.minimumApprovalsRequired;
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
      minimumApprovalsRequired,
      type: 'diagnostic',
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

  private validateApprovalPrerequisites(
    workOrder: WorkOrder | null,
    userId: string,
  ): void {
    if (!workOrder) throw new WorkOrderNotFoundException();

    // Validar si quiere aprobación
    if (!workOrder.requiresApproval)
      throw new WorkOrderAlreadyProcessedException();

    // Validar si ya fue aprobada
    if (workOrder.approvalDate) throw new WorkOrderAlreadyProcessedException();

    // Validar si hay aprobadores
    if (!workOrder.approversRequired?.length)
      throw new NoApproversConfiguredException();

    if (workOrder.minimumApprovalsRequired < 1)
      throw new NoApproversConfiguredException();

    // Validar que el usuario es aprobador
    const isApprover = workOrder.approversRequired.find(
      (approver) => approver.id === userId,
    );
    if (!isApprover) throw new UserIsNotApproverException();

    // Validar que no haya aprobado/rechazado previamente
    const hasApproved = workOrder.approvedBy?.find(
      (approver) => approver.id === userId,
    );
    const hasRejected = workOrder.rejectedBy?.find(
      (approver) => approver.id === userId,
    );
    if (hasApproved || hasRejected) throw new UserAlreadyApprovedException();
  }

  async approve(
    id: string,
    type: WorkOrderType,
    userId: string,
  ): Promise<boolean> {
    const workOrder = (await this.findById<WorkOrder>(id, type, [
      'approversRequired',
      'approvedBy',
      'rejectedBy',
    ])) as WorkOrder;

    this.validateApprovalPrerequisites(workOrder, userId);

    // Agregar al usuario a la lista de aprobadores
    const user = { id: userId } as User;
    const currentApprovers = workOrder.approvedBy ?? [];
    workOrder.approvedBy = [...currentApprovers, user];

    // Si se alcanzo el mínimo de aprobaciones, marcar como aprobada
    if (workOrder.approvedBy.length >= workOrder.minimumApprovalsRequired) {
      workOrder.approvalDate = new Date();
      workOrder.status = OrderStatus.approved;
    }

    const repository = this.getRepository(type);
    await repository.save(workOrder);

    return true;
  }

  async reject(
    id: string,
    type: WorkOrderType,
    userId: string,
  ): Promise<boolean> {
    const workOrder = (await this.findById<WorkOrder>(id, type, [
      'approversRequired',
      'approvedBy',
      'rejectedBy',
    ])) as WorkOrder;

    this.validateApprovalPrerequisites(workOrder, userId);

    // Agregar al usuario a la lista de rechazadores
    const user = { id: userId } as User;
    const currentRejected = workOrder.rejectedBy ?? [];
    workOrder.rejectedBy = [...currentRejected, user];

    const rejectedLength = workOrder.rejectedBy.length;
    const approvedLength = workOrder.approvedBy?.length ?? 0;
    const approversLength = workOrder.approversRequired!.length;
    const availableLength = approversLength - rejectedLength;
    const approbationsLeft =
      workOrder.minimumApprovalsRequired - approvedLength;
    // Si ya no hay más aprobadores, marcar como rechazada
    if (approbationsLeft > availableLength) {
      workOrder.rejectionDate = new Date();
      workOrder.status = OrderStatus.rejected;
    }

    const repository = this.getRepository(type);
    await repository.save(workOrder);

    return true;
  }
}
// Should divide into two services
