import { Group } from 'src/groups/domain';
import { GroupEntity } from 'src/groups/infraestructure/persistence/relational/entities';

export class GroupMapper {
  static toDomain(raw: GroupEntity): Group {
    const domainEntity = new Group();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.isActive = raw.isActive;
    domainEntity.permissions = raw.permissions;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    // Note: users relationship would need to be handled separately
    return domainEntity;
  }

  static toPersistence(domain: Group): GroupEntity {
    const rawEntity = new GroupEntity();
    rawEntity.id = domain.id;
    rawEntity.name = domain.name;
    rawEntity.isActive = domain.isActive;
    rawEntity.permissions = domain.permissions;
    rawEntity.createdAt = domain.createdAt;
    rawEntity.updatedAt = domain.updatedAt;
    // Note: userEntities relationship would need to be handled separately
    return rawEntity;
  }
}
