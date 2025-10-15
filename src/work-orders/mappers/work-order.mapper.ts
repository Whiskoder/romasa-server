import { plainToInstance } from 'class-transformer';
import { EmployeeMapper } from 'src/employees/mappers';
import { UserMapper } from 'src/users/mappers';
import {
  WorkOrderServiceMapper,
  WorkOrderDiagnosticMapper,
} from 'src/work-orders/mappers';

import { WorkOrderDiagnostic, WorkOrderService } from 'src/work-orders/domain';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';
import { WorkshopMapper } from 'src/workshops/mappers';

export class WorkOrderMapper {
  static toResponseDto(
    entity: WorkOrderDiagnostic | WorkOrderService,
    type: 'diagnostic' | 'service',
  ): ResponseWorkOrderDto {
    const workOrder = entity.workOrder;

    const dto = plainToInstance(ResponseWorkOrderDto, {
      id: workOrder.id,
      status: workOrder.status,
      requiresApproval: workOrder.requiresApproval,

      serviceRequest: workOrder.serviceRequest,
      workshop: WorkshopMapper.toResponseDto(workOrder.workshop),

      scheduling: {
        scheduledDate: workOrder.scheduledDate,
        scheduledBy: workOrder.scheduledBy
          ? UserMapper.toResponseDto(workOrder.scheduledBy)
          : undefined,
        estimatedDuration: workOrder.estimatedDuration,
        actualDuration: workOrder.actualDuration,
        vehicleInWorkshop: workOrder.vehicleInWorkshop,
      },

      assignment: {
        supervisor: EmployeeMapper.toResponseDto(workOrder.supervisor),
        assignedEmployee: EmployeeMapper.toResponseDto(
          workOrder.assignedEmployee,
        ),
      },

      approvalFlow: {
        approversRequired: workOrder.approversRequired?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        approvedBy: workOrder.approvedBy?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        rejectedBy: workOrder.rejectedBy?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        approvalDate: workOrder.approvalDate,
      },
    });

    if (type === 'diagnostic') {
      dto.diagnostic = WorkOrderDiagnosticMapper.toResponseDto(
        entity as WorkOrderDiagnostic,
      );
    }

    if (type === 'service') {
      dto.service = WorkOrderServiceMapper.toResponseDto(
        entity as WorkOrderService,
      );
    }

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderDiagnostic[] | WorkOrderService[],
    type: 'diagnostic' | 'service',
  ): ResponseWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderMapper.toResponseDto(workOrder, type),
    );
  }
}
