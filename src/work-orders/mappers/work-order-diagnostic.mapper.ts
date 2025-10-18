import { plainToInstance } from 'class-transformer';

import { WorkOrderDiagnostic } from 'src/work-orders/entities';
import { ResponseWorkOrderDiagnosticDto } from 'src/work-orders/dto';
import { EmployeeMapper } from 'src/employees/mappers';

export class WorkOrderDiagnosticMapper {
  static toResponseDto(
    entity: WorkOrderDiagnostic,
  ): ResponseWorkOrderDiagnosticDto {
    const dto = plainToInstance(ResponseWorkOrderDiagnosticDto, {
      id: entity.id,
      reportedSymptoms: entity.reportedSymptoms,
      impactsOperability: entity.impactsOperability,
      issueFrequency: entity.issueFrequency,
      technicalDescription: entity.technicalDescription,
      affectedSystems: entity.affectedSystems,
      requiredMaterials: entity.requiredMaterials,
      reportedByDriver: entity.reportedByDriver
        ? EmployeeMapper.toResponseDto(entity.reportedByDriver)
        : undefined,
    });

    return dto;
  }

  static toResponseDtoList(
    entities: WorkOrderDiagnostic[],
  ): ResponseWorkOrderDiagnosticDto[] {
    return entities.map((workOrder) =>
      WorkOrderDiagnosticMapper.toResponseDto(workOrder),
    );
  }
}
