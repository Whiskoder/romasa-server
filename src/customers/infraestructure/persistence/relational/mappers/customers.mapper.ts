import { Customer } from 'src/customers/domain';
import { CustomerEntity } from 'src/customers/infraestructure/persistence/relational/entities';

export class CustomersMapper {
  static toDomain(raw: CustomerEntity): Customer {
    const domainEntity = new Customer();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.type = raw.type;
    return domainEntity;
  }

  static toPersistence(domain: Customer): CustomerEntity {
    const rawEntity = new CustomerEntity();
    rawEntity.id = domain.id;
    rawEntity.name = domain.name;
    rawEntity.type = domain.type;
    return rawEntity;
  }
}
