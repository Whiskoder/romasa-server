import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { WorkOrderDiagnosticEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderMapper } from './work-order.mapper';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';
import { IssueFrequency, RepairType } from 'src/work-orders/enums';

export class WorkOrderDiagnosticMapper {
  static toDomain(raw: WorkOrderDiagnosticEntity): WorkOrderDiagnostic {
    const domainEntity = new WorkOrderDiagnostic();

    domainEntity.id = raw.id;
    domainEntity.reportedByDriver = EmployeeMapper.toDomain(
      raw.reportedByDriver,
    );
    domainEntity.workOrder = WorkOrderMapper.toDomain(raw.workOrderEntity);
    domainEntity.reportedSymptoms = raw.reportedSymptoms
      ? raw.reportedSymptoms.split(',').map((s) => s.trim())
      : [];
    domainEntity.impactsOperability = raw.impactsOperability;
    domainEntity.issueFrequency = raw.issueFrequency as IssueFrequency;
    domainEntity.technicalDescription = raw.technicalDescription
      ? raw.technicalDescription.split(',').map((s) => s.trim())
      : undefined;
    domainEntity.affectedSystems = raw.affectedSystems
      ? (raw.affectedSystems.split(',').map((s) => s.trim()) as RepairType[])
      : undefined;
    domainEntity.requiredMaterials = raw.requiredMaterials
      ? raw.requiredMaterials.split(',').map((s) => s.trim())
      : undefined;

    return domainEntity;
  }

  static toPersistence(domain: WorkOrderDiagnostic): WorkOrderDiagnosticEntity {
    const rawEntity = new WorkOrderDiagnosticEntity();

    rawEntity.id = domain.id;
    rawEntity.reportedByDriver = EmployeeMapper.toPersistence(
      domain.reportedByDriver,
    );
    rawEntity.workOrderEntity = WorkOrderMapper.toPersistence(domain.workOrder);
    rawEntity.reportedSymptoms = domain.reportedSymptoms.join(',');
    rawEntity.impactsOperability = domain.impactsOperability;
    rawEntity.issueFrequency = domain.issueFrequency;
    rawEntity.technicalDescription = domain.technicalDescription
      ? domain.technicalDescription.join(',')
      : undefined;
    rawEntity.affectedSystems = domain.affectedSystems
      ? domain.affectedSystems.join(',')
      : undefined;
    rawEntity.requiredMaterials = domain.requiredMaterials
      ? domain.requiredMaterials.join(',')
      : undefined;

    return rawEntity;
  }
}
