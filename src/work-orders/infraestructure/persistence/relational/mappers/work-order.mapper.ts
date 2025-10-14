import { WorkOrder } from 'src/work-orders/domain';
import { WorkOrderEntity } from 'src/work-orders/infraestructure/persistence/relational/entities';
import { ServiceRequestMapper } from 'src/service-requests/infraestructure/persistence/relational/mappers/service-request.mapper';
import { WorkshopMapper } from 'src/workshops/infraestructure/persistence/relational/mappers/workshop.mapper';
import { UserMapper } from 'src/users/infraestructure/persistence/relational/mappers/user.mapper';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';

export class WorkOrderMapper {
  static toDomain(raw: WorkOrderEntity): WorkOrder {
    const domainEntity = new WorkOrder();
    
    domainEntity.id = raw.id;
    domainEntity.serviceRequest = ServiceRequestMapper.toDomain(raw.serviceRequestEntity);
    domainEntity.workshop = WorkshopMapper.toDomain(raw.workshopEntity);
    domainEntity.scheduledDate = raw.scheduledDate;
    domainEntity.scheduledBy = raw.scheduledBy ? UserMapper.toDomain(raw.scheduledBy) : undefined;
    domainEntity.estimatedDuration = raw.estimatedDuration;
    domainEntity.actualDuration = raw.actualDuration;
    domainEntity.supervisor = raw.supervisor ? EmployeeMapper.toDomain(raw.supervisor) : undefined;
    domainEntity.assignedEmployee = raw.assignedEmployeeEntity ? EmployeeMapper.toDomain(raw.assignedEmployeeEntity) : undefined;
    domainEntity.vehicleInWorkshop = raw.vehicleInWorkshop;
    domainEntity.requiresApproval = raw.requiresApproval;
    domainEntity.approversRequired = raw.approversRequired?.map(user => UserMapper.toDomain(user));
    domainEntity.approvedBy = raw.approvedBy?.map(user => UserMapper.toDomain(user));
    domainEntity.rejectedBy = raw.rejectedBy?.map(user => UserMapper.toDomain(user));
    domainEntity.approvalDate = raw.approvalDate;
    domainEntity.status = raw.status;
    
    return domainEntity;
  }

  static toPersistence(domain: WorkOrder): WorkOrderEntity {
    const rawEntity = new WorkOrderEntity();
    
    rawEntity.id = domain.id;
    rawEntity.serviceRequestEntity = ServiceRequestMapper.toPersistence(domain.serviceRequest);
    rawEntity.workshopEntity = WorkshopMapper.toPersistence(domain.workshop);
    rawEntity.scheduledDate = domain.scheduledDate;
    rawEntity.scheduledBy = domain.scheduledBy ? UserMapper.toPersistence(domain.scheduledBy) : undefined;
    rawEntity.estimatedDuration = domain.estimatedDuration;
    rawEntity.actualDuration = domain.actualDuration;
    rawEntity.supervisor = domain.supervisor ? EmployeeMapper.toPersistence(domain.supervisor) : undefined;
    rawEntity.assignedEmployeeEntity = domain.assignedEmployee ? EmployeeMapper.toPersistence(domain.assignedEmployee) : undefined;
    rawEntity.vehicleInWorkshop = domain.vehicleInWorkshop;
    rawEntity.requiresApproval = domain.requiresApproval;
    rawEntity.approversRequired = domain.approversRequired?.map(user => UserMapper.toPersistence(user));
    rawEntity.approvedBy = domain.approvedBy?.map(user => UserMapper.toPersistence(user));
    rawEntity.rejectedBy = domain.rejectedBy?.map(user => UserMapper.toPersistence(user));
    rawEntity.approvalDate = domain.approvalDate;
    rawEntity.status = domain.status;
    
    return rawEntity;
  }
}
