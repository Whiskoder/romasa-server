import { Vehicle } from 'src/vehicles/domain';
import { VehicleEntity } from 'src/vehicles/infraestructure/persistence/relational/entities';

export class VehicleMapper {
  static toDomain(raw: VehicleEntity): Vehicle {
    const domainEntity = new Vehicle();

    domainEntity.id = raw.id;

    return domainEntity;
  }

  static toPersistence(domain: Vehicle): VehicleEntity {
    const rawEntity = new VehicleEntity();

    rawEntity.id = domain.id;

    return rawEntity;
  }
}
