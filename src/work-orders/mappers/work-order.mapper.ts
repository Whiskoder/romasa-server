import { plainToInstance } from 'class-transformer';
import { EmployeeMapper } from 'src/employees/mappers';
import { UserMapper } from 'src/users/mappers';
import {
  WorkOrderServiceMapper,
  WorkOrderDiagnosticMapper,
} from 'src/work-orders/mappers';

import {
  WorkOrder,
  WorkOrderDiagnostic,
  WorkOrderService,
} from 'src/work-orders/domain';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';
import { WorkshopMapper } from 'src/workshops/mappers';

export class WorkOrderMapper {
  static toResponseDto(entity: WorkOrder): ResponseWorkOrderDto {
    const dto = plainToInstance(ResponseWorkOrderDto, {
      id: entity.id,
      status: entity.status,
      requiresApproval: entity.requiresApproval,

      workshop: WorkshopMapper.toResponseDto(entity.workshop),

      scheduling: {
        scheduledDate: entity.scheduledDate,
        scheduledBy: entity.scheduledBy
          ? UserMapper.toResponseDto(entity.scheduledBy)
          : undefined,
        estimatedDuration: entity.estimatedDuration,
        actualDuration: entity.actualDuration,
        vehicleInWorkshop: entity.vehicleInWorkshop,
      },

      assignment: {
        supervisor: EmployeeMapper.toResponseDto(entity.supervisor),
        assignedEmployee: EmployeeMapper.toResponseDto(entity.assignedEmployee),
      },

      approvalFlow: {
        approversRequired: entity.approversRequired?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        approvedBy: entity.approvedBy?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        rejectedBy: entity.rejectedBy?.map((user) =>
          UserMapper.toResponseDto(user),
        ),
        approvalDate: entity.approvalDate,
      },
    });

    if (entity.type === 'diagnostic' && entity.diagnostic) {
      dto.diagnostic = WorkOrderDiagnosticMapper.toResponseDto(
        entity.diagnostic,
      );
    }

    if (entity.type === 'service' && entity.service) {
      dto.service = WorkOrderServiceMapper.toResponseDto(entity.service);
    }

    return dto;
  }

  static toResponseDtoList(workOrders: WorkOrder[]): ResponseWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
