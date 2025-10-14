import { Vehicle } from 'src/vehicles/domain';
import { VehicleEntity } from 'src/vehicles/infraestructure/persistence/relational/entities';

export class VehicleMapper {
  static toDomain(raw: VehicleEntity): Vehicle {
    const domainEntity = new Vehicle();
    // Map properties from VehicleEntity to Vehicle domain entity
    // This will need to be updated when the Vehicle domain entity is properly defined
    return domainEntity;
  }

  static toPersistence(domain: Vehicle): VehicleEntity {
    const rawEntity = new VehicleEntity();
    // Map properties from Vehicle domain entity to VehicleEntity
    // This will need to be updated when the Vehicle domain entity is properly defined
    return rawEntity;
  }
}
