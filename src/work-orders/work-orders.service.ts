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
import { WorkOrderType } from 'src/work-orders/types';
import { WorkOrderDiagnosticMapper } from './infraestructure/persistence/relational/mappers';
import { WorkOrderServiceMapper } from './infraestructure/persistence/relational/mappers';

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
    type: WorkOrderType,
    child: WorkOrderDiagnostic | WorkOrderService,
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

    const workOrder: any = {
      workshop,
      requiresApproval,
      status,
      type,
    };

    if (type === 'diagnostic') {
      workOrder.diagnostic = WorkOrderDiagnosticMapper.toPersistence(
        child as WorkOrderDiagnostic,
      );
    }

    if (type === 'service') {
      workOrder.service = WorkOrderServiceMapper.toPersistence(
        child as WorkOrderService,
      );
    }

    return this.workOrderRepository.create(workOrder);
  }

  async createDiagnosticWorkOrder(
    serviceRequestId: string,
    createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    requiresApproval: boolean,
  ): Promise<WorkOrder> {
    const { workshopId, reportedByDriverId, ...rest } =
      createDiagnosticWorkOrderDto;

    // Must go before createWorkOrder
    const employee = await this.employeesService.findById(reportedByDriverId);
    if (!employee) throw new EmployeeNotFoundException();

    const child = await this.workOrderDiagnosticRepository.create({
      reportedByDriver: employee,
      ...rest,
    });

    console.log({ child });

    return this.createWorkOrder(
      {
        workshopId,
        serviceRequestId,
        requiresApproval,
      },
      'diagnostic',
      child,
    );
  }

  async createServiceWorkOrder(
    serviceRequestId: string,
    createServiceWorkOrderDto: CreateWorkOrderServiceDto,
    requiresApproval: boolean,
  ): Promise<WorkOrder> {
    const { workshopId } = createServiceWorkOrderDto;

    const child = await this.workOrderServiceRepository.create({});

    return this.createWorkOrder(
      {
        workshopId,
        serviceRequestId,
        requiresApproval,
      },
      'service',
      child,
    );
  }
}
