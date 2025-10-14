import { NullableType } from 'src/core/types';
import { Employee } from 'src/employees/domain';

export abstract class EmployeeRepository {
  abstract findById(id: number): Promise<NullableType<Employee>>;
}
