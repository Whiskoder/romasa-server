import { WorkOrderDiagnostic } from 'src/work-orders/domain';
import { WorkOrderDiagnosticEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkOrderMapper } from './work-order.mapper';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';

export class WorkOrderDiagnosticMapper {
  static toDomain(raw: WorkOrderDiagnosticEntity): WorkOrderDiagnostic {
    const domainEntity = new WorkOrderDiagnostic();
    
    domainEntity.id = raw.id;
    domainEntity.workOrder = WorkOrderMapper.toDomain(raw.workOrderEntity);
    domainEntity.reportedByDriver = EmployeeMapper.toDomain(raw.reportedByDriver);
    domainEntity.reportedSymptoms = raw.reportedSymptoms ? raw.reportedSymptoms.split(',') : [];
    domainEntity.impactsOperability = raw.impactsOperability;
    domainEntity.issueFrequency = raw.issueFrequency as any; // Cast to enum
    domainEntity.technicalDescription = raw.technicalDescription ? raw.technicalDescription.split(',') : undefined;
    domainEntity.affectedSystems = raw.affectedSystems ? raw.affectedSystems.split(',') as any : undefined;
    domainEntity.requiredMaterials = raw.requiredMaterials ? raw.requiredMaterials.split(',') : undefined;
    
    return domainEntity;
  }

  static toPersistence(domain: WorkOrderDiagnostic): WorkOrderDiagnosticEntity {
    const rawEntity = new WorkOrderDiagnosticEntity();
    
    rawEntity.id = domain.id;
    rawEntity.workOrderEntity = WorkOrderMapper.toPersistence(domain.workOrder);
    rawEntity.reportedByDriver = EmployeeMapper.toPersistence(domain.reportedByDriver);
    rawEntity.reportedSymptoms = domain.reportedSymptoms.join(',');
    rawEntity.impactsOperability = domain.impactsOperability;
    rawEntity.issueFrequency = domain.issueFrequency;
    rawEntity.technicalDescription = domain.technicalDescription ? domain.technicalDescription.join(',') : undefined;
    rawEntity.affectedSystems = domain.affectedSystems ? domain.affectedSystems.join(',') : undefined;
    rawEntity.requiredMaterials = domain.requiredMaterials ? domain.requiredMaterials.join(',') : undefined;
    
    return rawEntity;
  }
}
