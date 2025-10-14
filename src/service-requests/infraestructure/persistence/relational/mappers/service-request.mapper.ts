import { ServiceRequest } from 'src/service-requests/domain/service-request';
import { ServiceRequestEntity } from 'src/service-requests/infraestructure/persistence/relational/entities';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { VehicleMapper } from 'src/vehicles/infraestructure/persistence/relational/mappers';

export class ServiceRequestMapper {
  static toDomain(raw: ServiceRequestEntity): ServiceRequest {
    const domainEntity = new ServiceRequest();

    domainEntity.id = raw.id;
    domainEntity.trackingCode = raw.trackingCode;
    domainEntity.priority = raw.priority as ServiceRequestPriority;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.requester = raw.requester;
    domainEntity.vehicle = VehicleMapper.toDomain(raw.vehicleEntity);

    return domainEntity;
  }

  static toPersistence(domain: ServiceRequest): ServiceRequestEntity {
    const persistenceEntity = new ServiceRequestEntity();

    persistenceEntity.id = domain.id;
    persistenceEntity.trackingCode = domain.trackingCode;
    persistenceEntity.priority = domain.priority;
    persistenceEntity.createdAt = domain.createdAt;
    persistenceEntity.updatedAt = domain.updatedAt;
    persistenceEntity.requester = domain.requester;
    persistenceEntity.vehicleEntity = VehicleMapper.toPersistence(
      domain.vehicle,
    );

    return persistenceEntity;
  }
}
