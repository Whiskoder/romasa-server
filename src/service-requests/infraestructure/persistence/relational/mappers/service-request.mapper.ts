import { ServiceRequest } from 'src/service-requests/domain/service-request';
import { ServiceRequestEntity } from 'src/service-requests/infraestructure/persistence/relational/entities';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { VehicleMapper } from 'src/vehicles/infraestructure/persistence/relational/mappers';
import { UserMapper } from 'src/users/infraestructure/persistence/relational/mappers';
import { CustomersMapper } from 'src/customers/infraestructure/persistence/relational/mappers/customers.mapper';

export class ServiceRequestMapper {
  static toDomain(raw: ServiceRequestEntity): ServiceRequest {
    const domainEntity = new ServiceRequest();

    domainEntity.id = raw.id;
    domainEntity.trackingCode = raw.trackingCode;
    domainEntity.priority = raw.priority as ServiceRequestPriority;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    if (raw.createdBy)
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    if (raw.updatedBy)
      domainEntity.updatedBy = UserMapper.toDomain(raw.updatedBy);
    if (raw.vehicleEntity)
      domainEntity.vehicle = VehicleMapper.toDomain(raw.vehicleEntity);
    if (raw.requester)
      domainEntity.requester = CustomersMapper.toDomain(raw.requester);

    return domainEntity;
  }

  static toPersistence(domain: ServiceRequest): ServiceRequestEntity {
    const persistenceEntity = new ServiceRequestEntity();

    persistenceEntity.id = domain.id;
    persistenceEntity.trackingCode = domain.trackingCode;
    persistenceEntity.priority = domain.priority;
    persistenceEntity.createdAt = domain.createdAt;
    persistenceEntity.updatedAt = domain.updatedAt;
    if (domain.vehicle)
      persistenceEntity.vehicleEntity = VehicleMapper.toPersistence(
        domain.vehicle,
      );
    if (domain.createdBy)
      persistenceEntity.createdBy = UserMapper.toPersistence(domain.createdBy);

    if (domain.updatedBy)
      persistenceEntity.updatedBy = UserMapper.toPersistence(domain.updatedBy);

    if (domain.requester)
      persistenceEntity.requester = CustomersMapper.toPersistence(
        domain.requester,
      );

    return persistenceEntity;
  }
}
