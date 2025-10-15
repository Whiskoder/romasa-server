import { plainToInstance } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/employees/dto';

import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { ResponseWorkOrderDiagnosticDto } from 'src/work-orders/dto';

export class WorkOrderDiagnosticMapper {
  static toResponseDto(
    workOrderDiagnostic: WorkOrderDiagnostic,
  ): ResponseWorkOrderDiagnosticDto {
    const dto = plainToInstance(ResponseWorkOrderDiagnosticDto, {
      id: workOrderDiagnostic.id,
      reportedSymptoms: workOrderDiagnostic.reportedSymptoms,
      impactsOperability: workOrderDiagnostic.impactsOperability,
      issueFrequency: workOrderDiagnostic.issueFrequency,
      technicalDescription: workOrderDiagnostic.technicalDescription,
      affectedSystems: workOrderDiagnostic.affectedSystems,
      requiredMaterials: workOrderDiagnostic.requiredMaterials,
    });

    if (workOrderDiagnostic.reportedByDriver) {
      dto.reportedByDriver = plainToInstance(
        ResponseEmployeeDto,
        workOrderDiagnostic.reportedByDriver,
      );
    }

    return dto;
  }

  static toResponseDtoList(
    workOrders: WorkOrderDiagnostic[],
  ): ResponseWorkOrderDiagnosticDto[] {
    return workOrders.map((workOrder) =>
      WorkOrderDiagnosticMapper.toResponseDto(workOrder),
    );
  }
}
