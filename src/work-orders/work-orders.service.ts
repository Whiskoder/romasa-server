import { Injectable } from '@nestjs/common';

import {
  CreateWorkOrderDiagnosticDto,
  CreateWorkOrderServiceDto,
  CreateWorkOrderDto,
} from 'src/work-orders/dto';
import {
  WorkOrder,
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/domain';
import { WorkOrderRepository } from './infraestructure/work-order.repository';
import { WorkOrderDiagnosticRepository } from './infraestructure/work-order-diagnostic.repository';
import { WorkOrderServiceRepository } from './infraestructure/work-order-service.repository';
import { WorkshopsService } from 'src/workshops/workshops.service';
import {
  WorkshopNotFoundException,
  ServiceRequestNotFoundException,
  EmployeeNotFoundException,
} from 'src/work-orders/exceptions';
import { ServiceRequestsService } from 'src/service-requests/service-requests.service';
import { EmployeesService } from 'src/employees/employees.service';
import { OrderStatus } from 'src/work-orders/enums';

@Injectable()
export class WorkOrdersService {
  constructor(
    private readonly workOrderRepository: WorkOrderRepository,
    private readonly workOrderDiagnosticRepository: WorkOrderDiagnosticRepository,
    private readonly workOrderServiceRepository: WorkOrderServiceRepository,
    private readonly workshopService: WorkshopsService,
    private readonly serviceRequestService: ServiceRequestsService,
    private readonly employeesService: EmployeesService,
  ) {}

  private async createWorkOrder(
    createWorkOrderDto: CreateWorkOrderDto,
  ): Promise<WorkOrder> {
    const { workshopId, serviceRequestId, requiresApproval } =
      createWorkOrderDto;

    const workshop = await this.workshopService.findById(workshopId);
    if (!workshop) throw new WorkshopNotFoundException();

    const serviceRequest =
      await this.serviceRequestService.findById(serviceRequestId);
    if (!serviceRequest) throw new ServiceRequestNotFoundException();

    const status = requiresApproval
      ? OrderStatus.pending_approval
      : OrderStatus.scheduled;

    return this.workOrderRepository.create({
      workshop,
      serviceRequest,
      requiresApproval,
      status,
    });
  }

  async createDiagnosticWorkOrder(
    serviceRequestId: string,
    createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    requiresApproval: boolean,
  ): Promise<WorkOrderDiagnostic> {
    const { workshopId, reportedByDriverId, ...rest } =
      createDiagnosticWorkOrderDto;

    // Must go before createWorkOrder
    const employee = await this.employeesService.findById(reportedByDriverId);
    if (!employee) throw new EmployeeNotFoundException();

    const workOrder = await this.createWorkOrder({
      workshopId,
      serviceRequestId,
      requiresApproval,
    });

    return this.workOrderDiagnosticRepository.create({
      workOrder,
      reportedByDriver: employee,
      ...rest,
    });
  }

  async createServiceWorkOrder(
    serviceRequestId: string,
    createServiceWorkOrderDto: CreateWorkOrderServiceDto,
    requiresApproval: boolean,
  ): Promise<WorkOrderService> {
    const { workshopId } = createServiceWorkOrderDto;

    const workOrder = await this.createWorkOrder({
      workshopId,
      serviceRequestId,
      requiresApproval,
    });

    return this.workOrderServiceRepository.create({
      workOrder,
    });
  }
}
