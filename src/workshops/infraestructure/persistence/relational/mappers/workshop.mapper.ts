import { Workshop } from 'src/workshops/domain';
import { WorkshopEntity } from 'src/workshops/infraestructure/persistence/relational/entities';

export class WorkshopMapper {
  static toDomain(raw: WorkshopEntity): Workshop {
    const domainEntity = new Workshop();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.capacity = raw.capacity;
    return domainEntity;
  }

  static toPersistence(domain: Workshop): WorkshopEntity {
    const rawEntity = new WorkshopEntity();
    rawEntity.id = domain.id;
    rawEntity.name = domain.name;
    rawEntity.capacity = domain.capacity;
    return rawEntity;
  }
}
