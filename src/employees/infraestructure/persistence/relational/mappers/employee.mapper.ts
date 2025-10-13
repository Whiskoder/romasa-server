import { Employee } from 'src/employees/domain';
import { EmployeeEntity } from 'src/employees/infraestructure/persistence/relational/entities';

export class EmployeeMapper {
  static toDomain(raw: EmployeeEntity): Employee {
    const domainEntity = new Employee();
    domainEntity.id = raw.id;
    domainEntity.employeeNumber = raw.employeeNumber;
    domainEntity.rfc = raw.rfc;
    domainEntity.curp = raw.curp;
    domainEntity.fullName = `${raw.firstName} ${raw.fatherName} ${raw.motherName}`;
    domainEntity.firstName = raw.firstName;
    domainEntity.motherName = raw.motherName;
    domainEntity.fatherName = raw.fatherName;
    domainEntity.gender = raw.gender === 1 ? 'male' : 'female';
    return domainEntity;
  }

  static toPersistence(domain: Employee): EmployeeEntity {
    const rawEntity = new EmployeeEntity();
    rawEntity.id = domain.id;
    rawEntity.employeeNumber = domain.employeeNumber;
    rawEntity.rfc = domain.rfc;
    rawEntity.curp = domain.curp;
    rawEntity.firstName = domain.firstName;
    rawEntity.fatherName = domain.fatherName;
    rawEntity.motherName = domain.motherName;
    rawEntity.gender = domain.gender === 'male' ? 1 : 2;
    return rawEntity;
  }
}
