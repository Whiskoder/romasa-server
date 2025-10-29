import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { EmployeeDriver } from './employee-driver.entity';
import { Employee } from './employee.entity';

@ViewEntity({
  name: 'employee_driver_view',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('ed.LNGCLVEMP', 'id')
      .addSelect('ed.STRNMRLCN', 'licenseNumber')
      .addSelect('ed.DTXPDLCN', 'licenseIssueDate')
      .addSelect('ed.DTVGNLCN', 'licenseExpiryDate')
      .addSelect('ed.STRTPOLCN', 'licenseType')
      .addSelect('e.LNGNOEMP', 'employeeNumber')
      .addSelect('e.STRRFCEMP', 'rfc')
      .addSelect('e.STRCRPEMP', 'curp')
      .addSelect('e.STRNOMEMP', 'firstName')
      .addSelect('e.STRAPPEMP', 'fatherName')
      .addSelect('e.STRAPMEMP', 'motherName')
      .addSelect(
        `UPPER(
					CONCAT(
						COALESCE(e.STRNOMEMP, ''),
						' ',
						COALESCE(e.STRAPPEMP, ''),
						' ',
						COALESCE(e.STRAPMEMP, '')
					)
				)`,
        'fullName',
      )
      .from(EmployeeDriver, 'ed')
      .innerJoin(Employee, 'e', 'ed.LNGCLVEMP = e.LNGCLVEMP'),
})
export class EmployeeDriverView {
  @ViewColumn() id: number;
  @ViewColumn() licenseNumber: string;
  @ViewColumn() licenseIssueDate: Date;
  @ViewColumn() licenseExpiryDate: Date;
  @ViewColumn() licenseType: string;
  @ViewColumn() rfc: string;
  @ViewColumn() curp: string;
  @ViewColumn() employeeNumber: string;
  @ViewColumn() firstName: string;
  @ViewColumn() fatherName: string;
  @ViewColumn() motherName: string;
  @ViewColumn() fullName: string;
}
//  `ISNULL((
// 					SELECT
// 						e.LNGNOEMP      AS [employee_number],
// 						e.STRNOMEMP      AS [employee_firstName],
// 						e.STRAPMEMP     AS [employee_motherName],
// 						e.STRAPPEMP     AS [employee_fatherName]

// 						ed.LNGNOEMP      AS [driver_number],
// 						ed.STRNOMEMP      AS [driver_firstName],
// 						ed.STRAPMEMP     AS [driver_motherName],
// 					FROM TBLCATEMP AS ed
// 					LEFT JOIN [user] AS u ON u.id = e.LNGCLVEMP
// 					WHERE e.LNGCLVEMP = employeeDriver.employeeId
// 					ORDER BY u.id
// 					FOR JSON PATH
// 				), '[]')`,
//       'employeeDriver.employee',
