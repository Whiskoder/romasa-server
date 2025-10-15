import { WorkOrder } from 'src/work-orders/domain';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { WorkshopMapper } from 'src/workshops/infraestructure/persistence/relational/mappers/workshop.mapper';
import { UserMapper } from 'src/users/infraestructure/persistence/relational/mappers/user.mapper';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';
import { WorkOrderDiagnosticMapper } from './work-order-diagnostic.mapper';
import { WorkOrderServiceMapper } from './work-order-service.mapper';

export class WorkOrderMapper {
  static toDomain(raw: WorkOrderEntity): WorkOrder {
    const domainEntity = new WorkOrder();

    domainEntity.id = raw.id;
    domainEntity.status = raw.status;
    domainEntity.requiresApproval = raw.requiresApproval;
    domainEntity.scheduledDate = raw.scheduledDate;
    domainEntity.estimatedDuration = raw.estimatedDuration;
    domainEntity.actualDuration = raw.actualDuration;
    domainEntity.vehicleInWorkshop = raw.vehicleInWorkshop;
    domainEntity.approvalDate = raw.approvalDate;

    if (raw.workshopEntity) {
      domainEntity.workshop = WorkshopMapper.toDomain(raw.workshopEntity);
    }

    if (raw.scheduledBy) {
      domainEntity.scheduledBy = UserMapper.toDomain(raw.scheduledBy);
    }

    if (raw.supervisor) {
      domainEntity.supervisor = EmployeeMapper.toDomain(raw.supervisor);
    }

    if (raw.assignedEmployeeEntity) {
      domainEntity.assignedEmployee = EmployeeMapper.toDomain(
        raw.assignedEmployeeEntity,
      );
    }

    if (raw.approversRequired) {
      domainEntity.approversRequired = raw.approversRequired.map((user) =>
        UserMapper.toDomain(user),
      );
    }

    if (raw.approvedBy) {
      domainEntity.approvedBy = raw.approvedBy.map((user) =>
        UserMapper.toDomain(user),
      );
    }

    if (raw.rejectedBy) {
      domainEntity.rejectedBy = raw.rejectedBy.map((user) =>
        UserMapper.toDomain(user),
      );
    }

    if (raw.diagnostic) {
      domainEntity.diagnostic = WorkOrderDiagnosticMapper.toDomain(
        raw.diagnostic,
      );
    }

    if (raw.service) {
      domainEntity.service = WorkOrderServiceMapper.toDomain(raw.service);
    }

    return domainEntity;
  }

  static toPersistence(domain: WorkOrder): WorkOrderEntity {
    const rawEntity = new WorkOrderEntity();

    rawEntity.id = domain.id;

    rawEntity.workshopEntity = WorkshopMapper.toPersistence(domain.workshop);
    rawEntity.scheduledDate = domain.scheduledDate;
    rawEntity.scheduledBy = domain.scheduledBy
      ? UserMapper.toPersistence(domain.scheduledBy)
      : undefined;
    rawEntity.estimatedDuration = domain.estimatedDuration;
    rawEntity.actualDuration = domain.actualDuration;
    rawEntity.supervisor = domain.supervisor
      ? EmployeeMapper.toPersistence(domain.supervisor)
      : undefined;
    rawEntity.assignedEmployeeEntity = domain.assignedEmployee
      ? EmployeeMapper.toPersistence(domain.assignedEmployee)
      : undefined;
    rawEntity.vehicleInWorkshop = domain.vehicleInWorkshop;
    rawEntity.requiresApproval = domain.requiresApproval;
    rawEntity.approversRequired = domain.approversRequired?.map((user) =>
      UserMapper.toPersistence(user),
    );
    rawEntity.approvedBy = domain.approvedBy?.map((user) =>
      UserMapper.toPersistence(user),
    );
    rawEntity.rejectedBy = domain.rejectedBy?.map((user) =>
      UserMapper.toPersistence(user),
    );
    rawEntity.diagnostic = domain.diagnostic
      ? WorkOrderDiagnosticMapper.toPersistence(domain.diagnostic)
      : undefined;
    rawEntity.service = domain.service
      ? WorkOrderServiceMapper.toPersistence(domain.service)
      : undefined;

    rawEntity.approvalDate = domain.approvalDate;
    rawEntity.status = domain.status;

    return rawEntity;
  }
}
