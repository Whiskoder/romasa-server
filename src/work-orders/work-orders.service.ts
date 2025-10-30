import { Repository } from 'typeorm';

import { Injectable, NotImplementedException } from '@nestjs/common';
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
import { Employee } from 'src/employees/entities';
import { ServiceRequestStatus } from 'src/service-requests/enums';
import { NotificationsService } from 'src/notifications/notifications.service';
import WorkOrderApprobationRequired from 'src/notifications/emails/work-order-approbation-required';
import { AllConfigType } from 'src/core/config';
import { ConfigService } from '@nestjs/config';
import WorkOrderApprovedEmail from 'src/notifications/emails/work-order-approved';

interface WorkOrderPrerequisites {
  workshop: Workshop;
  serviceRequest: ServiceRequest;
}

interface ApprovalConfiguration {
  users: User[];
  minimumApprovalsRequired: number;
}

interface BaseWorkOrderData {
  id: string;
  serviceRequest: ServiceRequest;
  workshop: Workshop;
  requiresApproval: boolean;
  status: OrderStatus;
}

@Injectable()
export class WorkOrdersService {
  private readonly repositoryMap: Map<WorkOrderType, Repository<WorkOrder>>;

  constructor(
    @InjectRepository(WorkOrderDiagnostic)
    private readonly diagnosticRepository: Repository<WorkOrderDiagnostic>,
    @InjectRepository(WorkOrderService)
    private readonly serviceRepository: Repository<WorkOrderService>,
    private readonly workshopService: WorkshopsService,
    private readonly serviceRequestService: ServiceRequestsService,
    private readonly employeesService: EmployeesService,
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {
    this.repositoryMap = new Map([
      ['diagnostic', this.diagnosticRepository as Repository<WorkOrder>],
      ['service', this.serviceRepository as Repository<WorkOrder>],
    ]);
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

  async createDiagnosticWorkOrder(
    serviceRequestId: string,
    createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    userGroupId: string,
    userPermissions: Set<string>,
  ): Promise<WorkOrderDiagnostic> {
    const {
      workshopId,
      reportedByDriverId,
      reportedSymptoms,
      ...additionalData
    } = createDiagnosticWorkOrderDto;

    const requiresApproval = this.shouldRequireApproval(userPermissions);

    const approvalConfig = requiresApproval
      ? await this.getApprovalConfiguration(userGroupId)
      : this.getDefaultApprovalConfig();

    const prerequisites = await this.validateWorkOrderPrerequisites(
      workshopId,
      serviceRequestId,
      'diagnostic',
    );

    const reportedByDriver = await this.validateEmployee(reportedByDriverId);

    const baseWorkOrder = this.createBaseWorkOrderData(
      prerequisites.workshop,
      prerequisites.serviceRequest,
      requiresApproval,
    );

    const diagnosticWorkOrder = this.buildDiagnosticWorkOrder(
      baseWorkOrder,
      reportedByDriver,
      reportedSymptoms,
      approvalConfig,
      additionalData,
    );

    const entity = this.diagnosticRepository.create(diagnosticWorkOrder);
    await this.diagnosticRepository.save(entity);

    await this.serviceRequestService.updateStatus(
      serviceRequestId,
      requiresApproval
        ? ServiceRequestStatus.diagnostic_pending_approval
        : ServiceRequestStatus.diagnostic_approved,
    );

    if (requiresApproval) {
      const trackingCode = prerequisites.serviceRequest.trackingCode;
      const domain = this.configService.get<string>('app.frontendDomain', {
        infer: true,
      });
      const reportLink = `${domain}/service-request/details/${trackingCode}`;
      const users = approvalConfig.users;

      const notifications = users.map((user) => {
        const employee = user.employee;
        // TODO: move fullname to users
        const recipientName = `${employee.firstName} ${employee.fatherName}`;
        const message = WorkOrderApprobationRequired({
          recipientName,
          recipientEmail: user.email,
          reportLink,
          trackingCode,
        });

        return {
          to: user.email,
          subject: 'Revisión y aprobación de orden de diagnóstico',
          message,
        };
      });

      await this.notificationsService.batchNotify(notifications);
    }

    return entity;
  }

  async createServiceWorkOrder(
    serviceRequestId: string,
    createServiceWorkOrderDto: CreateWorkOrderServiceDto,
    userGroupId: string,
    userPermissions: Set<string>,
  ): Promise<WorkOrderService> {
    throw new NotImplementedException();
    // const { workshopId, ...additionalData } = createServiceWorkOrderDto;

    // const prerequisites = await this.validateWorkOrderPrerequisites(
    //   workshopId,
    //   serviceRequestId,
    //   'service',
    // );

    // const baseWorkOrder = this.createBaseWorkOrderData(
    //   prerequisites.workshop,
    //   prerequisites.serviceRequest,
    //   requiresApproval,
    // );

    // const serviceWorkOrder = this.buildServiceWorkOrder(
    //   baseWorkOrder,
    //   additionalData,
    // );

    // const entity = this.serviceRepository.create(serviceWorkOrder);
    // await this.serviceRepository.save(entity);
    // return entity;
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
      'serviceRequest',
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

      // Notify to creator & taller
      // const wo = workOrder as any;
      // const serviceRequest = await this.serviceRequestService.findById({
      //   id: wo.serviceRequest.id,
      // });
      // if (serviceRequest) {
      //   const trackingCode = serviceRequest.trackingCode;
      //   const domain = this.configService.get<string>('app.frontendDomain', {
      //     infer: true,
      //   });
      //   const reportLink = `${domain}/service-request/details/${trackingCode}`;
      //   const users = [serviceRequest.createdBy];

      //   const notifications = users.map((user) => {
      //     // const employee = user.employee;
      //     // TODO: move fullname to users
      //     // const recipientName = `${employee.firstName} ${employee.fatherName}`;
      //     const message = WorkOrderApprovedEmail({
      //       recipientName: user.email,
      //       recipientEmail: user.email,
      //       reportLink,
      //       trackingCode,
      //     });

      //     return {
      //       to: user.email,
      //       subject: 'Orden de diagnóstico aprobada',
      //       message,
      //     };
      //   });

      //   await this.notificationsService.batchNotify(notifications);
      // }
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

  private getRepository(type: WorkOrderType): Repository<WorkOrder> {
    const repository = this.repositoryMap.get(type);
    if (!repository) throw new InvalidWorkOrderTypeException(type);
    return repository;
  }

  private async validateWorkOrderPrerequisites(
    workshopId: string,
    serviceRequestId: string,
    type: 'service' | 'diagnostic',
  ): Promise<WorkOrderPrerequisites> {
    const workshop = await this.validateWorkshop(workshopId);
    const serviceRequest = await this.validateServiceRequest(
      serviceRequestId,
      type,
    );

    return { workshop, serviceRequest };
  }

  private async validateWorkshop(workshopId: string): Promise<Workshop> {
    const workshop = await this.workshopService.findById(workshopId);
    if (!workshop) throw new WorkshopNotFoundException();
    return workshop;
  }

  private async validateServiceRequest(
    id: string,
    type: 'service' | 'diagnostic',
  ): Promise<ServiceRequest> {
    const serviceRequest = await this.serviceRequestService.findById({
      id,
      relations: [type],
    });

    if (!serviceRequest) throw new ServiceRequestNotFoundException();

    const existingOrder =
      type === 'service' ? serviceRequest.service : serviceRequest.diagnostic;

    if (existingOrder) throw new ServiceRequestAlreadyHasAnOrderException();

    return serviceRequest;
  }

  private async validateEmployee(employeeId: number): Promise<Employee> {
    const employee = await this.employeesService.findById(employeeId);
    if (!employee) throw new EmployeeNotFoundException();
    return employee;
  }

  private shouldRequireApproval(userPermissions: Set<string>): boolean {
    return !userPermissions.has(
      Permissions.work_orders.create_without_approval,
    );
  }

  private async getApprovalConfiguration(
    userGroupId: string,
  ): Promise<ApprovalConfiguration> {
    const group = await this.groupsService.findById(userGroupId, [
      'woDiagnosticApprovers',
    ]);

    const minimumApprovalsRequired =
      group?.woDiagnosticMinimumApprovalsRequired;
    const users = group?.woDiagnosticApprovers;

    if (!minimumApprovalsRequired || !users?.length)
      throw new NoApproversConfiguredException();

    return { minimumApprovalsRequired, users };
  }

  private getDefaultApprovalConfig(): ApprovalConfiguration {
    return {
      users: [],
      minimumApprovalsRequired: 1,
    };
  }

  private createBaseWorkOrderData(
    workshop: Workshop,
    serviceRequest: ServiceRequest,
    requiresApproval: boolean,
  ): BaseWorkOrderData {
    return {
      id: uuidPlugin.v7(),
      serviceRequest,
      workshop,
      requiresApproval,
      status: this.determineInitialStatus(requiresApproval),
    };
  }

  private determineInitialStatus(requiresApproval: boolean): OrderStatus {
    return requiresApproval
      ? OrderStatus.pending_approval
      : OrderStatus.approved;
  }

  private buildDiagnosticWorkOrder(
    baseWorkOrder: BaseWorkOrderData,
    reportedByDriver: Employee,
    reportedSymptoms: string[],
    approvalConfig: ApprovalConfiguration,
    additionalData: Record<string, any>,
  ): Partial<WorkOrderDiagnostic> {
    return {
      ...baseWorkOrder,
      ...additionalData,
      type: 'diagnostic',
      reportedByDriver,
      reportedSymptoms: reportedSymptoms.join(','),
      approversRequired: approvalConfig.users,
      minimumApprovalsRequired: approvalConfig.minimumApprovalsRequired,
    };
  }

  private buildServiceWorkOrder(
    baseWorkOrder: BaseWorkOrderData,
    approvalConfig: ApprovalConfiguration,
    additionalData: Record<string, any>,
  ): Partial<WorkOrderService> {
    return {
      ...baseWorkOrder,
      ...additionalData,
      type: 'service',
      approversRequired: approvalConfig.users,
      minimumApprovalsRequired: approvalConfig.minimumApprovalsRequired,
    };
  }
}
