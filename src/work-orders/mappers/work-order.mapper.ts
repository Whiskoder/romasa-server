import { plainToInstance } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/employees/dto';

import { WorkOrder } from 'src/work-orders/domain';
import { ResponseWorkOrderDto } from 'src/work-orders/dto';

export class WorkOrderMapper {
  static toResponseDto(entity: WorkOrder): ResponseWorkOrderDto {
    const dto = new ResponseWorkOrderDto();

    dto.id = entity.id;
    dto.status = entity.status;
    dto.requiresApproval = entity.requiresApproval;

    if (entity.serviceRequest) {
      dto.serviceRequest = {
        id: entity.serviceRequest.id,
        trackingCode: entity.serviceRequest.trackingCode,
        priority: entity.serviceRequest.priority,
        createdAt: entity.serviceRequest.createdAt,
      };
    }

    if (entity.serviceRequest.vehicle) {
      dto.vehicle = {
        id: entity.serviceRequest.vehicle.id,
        // transportNumber: entity.serviceRequest.vehicle.transportNumber,
        // licensePlate: entity.serviceRequest.vehicle.licensePlate,
        // brand: entity.serviceRequest.vehicle.brand,
        // model: entity.serviceRequest.vehicle.model,
      };
    }

    if (entity.workshop) {
      dto.workshop = {
        id: entity.workshop.id,
        name: entity.workshop.name,
        capacity: entity.workshop.capacity,
      };
    }

    if (
      entity.scheduledDate ||
      entity.scheduledBy ||
      entity.estimatedDuration
    ) {
      dto.scheduling = {
        scheduledDate: entity.scheduledDate,
        estimatedDuration: entity.estimatedDuration,
        actualDuration: entity.actualDuration,
        vehicleInWorkshop: entity.vehicleInWorkshop,
      };

      if (entity.scheduledBy?.employee) {
        dto.scheduling.scheduledBy = {
          id: entity.scheduledBy.id,
          email: entity.scheduledBy.email,
          employeeFullName: entity.scheduledBy.employee.fullName,
        };
      }
    }

    if (entity.supervisor || entity.assignedEmployee) {
      dto.assignment = {};

      if (entity.supervisor) {
        dto.assignment.supervisor = this.mapEmployeeToDto(entity.supervisor);
      }

      if (entity.assignedEmployee) {
        dto.assignment.assignedEmployee = this.mapEmployeeToDto(
          entity.assignedEmployee,
        );
      }
    }

    if (entity.requiresApproval) {
      dto.approvalFlow = {
        approvalDate: entity.approvalDate,
      };

      if (entity.approversRequired?.length) {
        dto.approvalFlow.approversRequired = entity.approversRequired.map(
          (user) =>
            ({
              id: user.id,
              email: user.email,
            }) as any,
        );
      }

      if (entity.approvedBy?.length) {
        dto.approvalFlow.approvedBy = entity.approvedBy.map(
          (user) =>
            ({
              id: user.id,
              email: user.email,
            }) as any,
        );
      }

      if (entity.rejectedBy?.length) {
        dto.approvalFlow.rejectedBy = entity.rejectedBy.map(
          (user) =>
            ({
              id: user.id,
              email: user.email,
            }) as any,
        );
      }
    }

    return dto;
  }

  private static mapEmployeeToDto(employee: any): ResponseEmployeeDto {
    return {
      id: employee.id,
      employeeNumber: employee.employeeNumber,
      fullName: employee.fullName,
      firstName: employee.firstName,
      fatherName: employee.fatherName,
      motherName: employee.motherName,
    };
  }

  static toResponseDtoList(workOrders: WorkOrder[]): ResponseWorkOrderDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
