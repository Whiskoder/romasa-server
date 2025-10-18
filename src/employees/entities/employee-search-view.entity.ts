import { ViewColumn, ViewEntity } from 'typeorm';
import { DataSource } from 'typeorm/browser';
import { Employee } from './employee.entity';

@ViewEntity({
  name: 'employee_search_view',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder(Employee, 'employees')
      .select('employees.id', 'id')
      .addSelect('employees.employeeNumber', 'employeeNumber')
      .addSelect('employees.rfc', 'rfc')
      .addSelect('employees.firstName', 'firstName')
      .addSelect('employees.motherName', 'motherName')
      .addSelect('employees.fatherName', 'fatherName')
      .addSelect(
        `UPPER(
					CONCAT(
						COALESCE(employees.firstName, ''),
						' ',
						COALESCE(employees.motherName, ''),
						' ',
						COALESCE(employees.fatherName, '')
					)
				)`,
        'fullName',
      ),
})
export class EmployeeSearchView {
  @ViewColumn()
  id: string;

  @ViewColumn()
  employeeNumber: string;

  @ViewColumn()
  rfc: string;

  @ViewColumn()
  fullName: string;

  @ViewColumn()
  firstName: string;

  @ViewColumn()
  motherName: string;

  @ViewColumn()
  fatherName: string;
}
