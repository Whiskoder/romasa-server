import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateWorkOrderDiagnosticDto,
  CreateWorkOrderServiceDto,
  CreateWorkOrderDto,
} from 'src/work-orders/dto';

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
import {
  WorkOrder,
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/entities';
import { uuidPlugin } from 'src/core/plugins';

@Injectable()
export class WorkOrdersService {
  constructor(
    // @InjectRepository(WorkOrder)
    // private readonly workOrdersRepository: Repository<WorkOrder>,
    @InjectRepository(WorkOrderDiagnostic)
    private readonly workOrderDiagnosticsRepository: Repository<WorkOrderDiagnostic>,
    @InjectRepository(WorkOrderService)
    private readonly workOrderServicesRepository: Repository<WorkOrderService>,
    private readonly workshopService: WorkshopsService,
    private readonly serviceRequestService: ServiceRequestsService,
    private readonly employeesService: EmployeesService,
  ) {}

  // TODO: CHECK BEFORE INSERT NEW
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

    const workOrder = {
      id: uuidPlugin.v7(),
      serviceRequest,
      workshop,
      requiresApproval,
      status,
    };

    // const entity = this.workOrdersRepository.create(workOrder);
    // await this.workOrdersRepository.save(entity);

    return workOrder;
  }

  async createDiagnosticWorkOrder(
    serviceRequestId: string,
    createDiagnosticWorkOrderDto: CreateWorkOrderDiagnosticDto,
    requiresApproval: boolean,
  ): Promise<WorkOrderDiagnostic> {
    const { workshopId, reportedByDriverId, reportedSymptoms, ...rest } =
      createDiagnosticWorkOrderDto;

    const employee = await this.employeesService.findById(reportedByDriverId);
    if (!employee) throw new EmployeeNotFoundException();

    const workOrderBase = await this.createWorkOrder({
      workshopId,
      serviceRequestId,
      requiresApproval,
    });

    const workOrderDiagnostic = {
      ...rest,
      reportedSymptoms: reportedSymptoms.join(','),
      reportedByDriver: employee,
      ...workOrderBase,
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

    const workOrderBase = await this.createWorkOrder({
      workshopId,
      serviceRequestId,
      requiresApproval,
    });

    const workOrderService = {
      ...workOrderBase,
    };
    const entity = this.workOrderServicesRepository.create(workOrderService);

    await this.workOrderServicesRepository.save(entity);

    return entity;
  }
}
