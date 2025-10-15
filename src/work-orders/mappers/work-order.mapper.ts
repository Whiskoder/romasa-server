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
} from 'src/work-orders/entities';
import {
  ResponseWorkOrderDiagnosticDto,
  ResponseWorkOrderDto,
  ResponseWorkOrderServiceDto,
} from 'src/work-orders/dto';
import { WorkshopMapper } from 'src/workshops/mappers';
import { ResponseEmployeeDto } from 'src/employees/dto';

export class WorkOrderMapper {
  static diagnosticToResponseDto(
    entity: WorkOrderDiagnostic,
  ): ResponseWorkOrderDiagnosticDto {
    const base = WorkOrderMapper.toResponseDto(entity);
    const dto = plainToInstance(ResponseWorkOrderDiagnosticDto, {
      ...base,
      reportedByDriver: EmployeeMapper.toResponseDto(entity.reportedByDriver),
      reportedSymptoms: entity.reportedSymptoms,
      impactsOperability: entity.impactsOperability,
      issueFrequency: entity.issueFrequency,
      technicalDescription: entity.technicalDescription,
      affectedSystems: entity.affectedSystems,
      requiredMaterials: entity.requiredMaterials,
    });

    return dto;
  }

  static serviceToResponseDto(
    entity: WorkOrderService,
  ): ResponseWorkOrderServiceDto {
    const base = WorkOrderMapper.toResponseDto(entity);
    const dto = plainToInstance(ResponseWorkOrderServiceDto, {
      ...base,
      fuelLevelAtReception: entity.fuelLevelAtReception,
      mileageAtReception: entity.mileageAtReception,
      receivedInventoryItems: entity.receivedInventoryItems || [],
      visualInspection: {
        roof: entity.roofObservations || [],
        front: entity.frontObservations || [],
        leftSide: entity.leftSideObservations || [],
        rightSide: entity.rightSideObservations || [],
        rear: entity.rearObservations || [],
      },
      workPerformed: entity.performedServices
        ? {
            services: entity.performedServices || [],
            replacementParts: entity.installedReplacementParts || [],
            fluids: entity.addedFluids || [],
          }
        : undefined,
    });

    return dto;
  }

  static toResponseDto(entity: WorkOrder): ResponseWorkOrderDto {
    const dto = plainToInstance(ResponseWorkOrderDto, {
      id: entity.id,
      status: entity.status,
      requiresApproval: entity.requiresApproval,

      workshop: entity.workshop
        ? WorkshopMapper.toResponseDto(entity.workshop)
        : undefined,

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
        supervisor: entity.supervisor
          ? EmployeeMapper.toResponseDto(entity.supervisor)
          : undefined,
        assignedEmployee: entity.assignedEmployee
          ? EmployeeMapper.toResponseDto(entity.assignedEmployee)
          : undefined,
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

    return dto;
  }

  static toResponseDtoList(entities: WorkOrder[]): ResponseWorkOrderDto[] {
    return entities.map((workOrder) =>
      WorkOrderMapper.toResponseDto(workOrder),
    );
  }
}
