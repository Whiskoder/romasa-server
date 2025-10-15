import { WorkOrder } from 'src/work-orders/domain';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { ServiceRequestMapper } from 'src/service-requests/infraestructure/persistence/relational/mappers/service-request.mapper';
import { WorkshopMapper } from 'src/workshops/infraestructure/persistence/relational/mappers/workshop.mapper';
import { UserMapper } from 'src/users/infraestructure/persistence/relational/mappers/user.mapper';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';
import { User } from 'src/users/domain';

export class WorkOrderMapper {
  static toDomain(raw: WorkOrderEntity): WorkOrder {
    const domainEntity = new WorkOrder();

    domainEntity.id = raw.id;
    domainEntity.status = raw.status;
    domainEntity.requiresApproval = raw.requiresApproval;
    domainEntity.scheduledDate = raw.scheduledDate;
    domainEntity.actualDuration = raw.actualDuration;
    domainEntity.vehicleInWorkshop = raw.vehicleInWorkshop;
    domainEntity.approvalDate = raw.approvalDate;

    if (raw.serviceRequestEntity) {
      domainEntity.serviceRequest = {
        id: raw.serviceRequestEntity.id,
        trackingCode: raw.serviceRequestEntity.trackingCode,
        priority: raw.serviceRequestEntity.priority as any,
        createdAt: raw.serviceRequestEntity.createdAt,
        updatedAt: raw.serviceRequestEntity.updatedAt,
      } as any;
    }

    if (raw.workshopEntity) {
      domainEntity.workshop = {
        id: raw.workshopEntity.id,
        name: raw.workshopEntity.name,
        capacity: raw.workshopEntity.capacity,
      } as any;
    }

    if (raw.scheduledBy) {
      domainEntity.scheduledBy = {
        id: raw.scheduledBy.id,
        email: raw.scheduledBy.email,
      } as any;
    }

    if (raw.supervisor) {
      domainEntity.supervisor = {
        id: raw.supervisor.id,
        employeeNumber: raw.supervisor.employeeNumber,
        firstName: raw.supervisor.firstName,
      } as any;
    }

    if (raw.assignedEmployeeEntity) {
      domainEntity.assignedEmployee = {
        id: raw.assignedEmployeeEntity.id,
        employeeNumber: raw.assignedEmployeeEntity.employeeNumber,
        firstName: raw.assignedEmployeeEntity.firstName,
      } as any;
    }
    domainEntity.estimatedDuration = raw.estimatedDuration;

    if (raw.approversRequired) {
      domainEntity.approversRequired = raw.approversRequired.map(
        (user) =>
          ({
            id: user.id,
            email: user.email,
          }) as any,
      );
    }

    if (raw.approvedBy) {
      domainEntity.approvedBy = raw.approvedBy.map(
        (user) =>
          ({
            id: user.id,
            email: user.email,
          }) as any,
      );
    }

    if (raw.rejectedBy) {
      domainEntity.rejectedBy = raw.rejectedBy.map(
        (user) =>
          ({
            id: user.id,
            email: user.email,
          }) as any,
      );
    }

    return domainEntity;
  }

  static toPersistence(domain: WorkOrder): WorkOrderEntity {
    const rawEntity = new WorkOrderEntity();

    rawEntity.id = domain.id;
    rawEntity.serviceRequestEntity = ServiceRequestMapper.toPersistence(
      domain.serviceRequest,
    );
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
    rawEntity.approvalDate = domain.approvalDate;
    rawEntity.status = domain.status;

    return rawEntity;
  }
}
