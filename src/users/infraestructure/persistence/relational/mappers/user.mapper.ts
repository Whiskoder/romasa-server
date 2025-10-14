import { User } from 'src/users/domain';
import { UserEntity } from 'src/users/infraestructure/persistence/relational/entities';
import { EmployeeMapper } from 'src/employees/infraestructure/persistence/relational/mappers/employee.mapper';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    domainEntity.id = raw.id;
    domainEntity.hashedPassword = raw.hashedPassword;
    domainEntity.email = raw.email;
    if (raw.employeeEntity) {
      domainEntity.employee = EmployeeMapper.toDomain(raw.employeeEntity);
    }
    domainEntity.isActive = raw.isActive;
    domainEntity.encryptedTokenSecret = raw.encryptedTokenSecret;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserEntity {
    const persistenceEntity = new UserEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.hashedPassword = domainEntity.hashedPassword;
    persistenceEntity.email = domainEntity.email;
    if (domainEntity.employee) {
      persistenceEntity.employeeEntity = EmployeeMapper.toPersistence(
        domainEntity.employee,
      );
    }
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.encryptedTokenSecret = domainEntity.encryptedTokenSecret;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
