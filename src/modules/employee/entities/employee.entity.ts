import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'TBLCATEMP' })
export class Employee {
  @PrimaryColumn({ name: 'LNGCLVEMP', type: 'int' })
  id: number;

  @Column({ name: 'LNGNOEMP', type: 'int', nullable: true })
  employeeNumber: number;

  @Column({ name: 'STRRFCEMP', type: 'nvarchar', length: 13, nullable: true })
  rfc: string;

  @Column({ name: 'STRCRPEMP', type: 'nvarchar', length: 18, nullable: true })
  curp: string;

  @Column({ name: 'STRNOMEMP', type: 'nvarchar', length: 255, nullable: true })
  firstName: string;

  @Column({ name: 'STRAPPEMP', type: 'nvarchar', length: 255, nullable: true })
  lastName: string;

  @Column({ name: 'STRAPMEMP', type: 'nvarchar', length: 255, nullable: true })
  middleName: string;

  @Column({ name: 'STRCALEMP', type: 'nvarchar', length: 255, nullable: true })
  street: string;

  @Column({ name: 'STRNXTEMP', type: 'nvarchar', length: 50, nullable: true })
  exteriorNumber: string;

  @Column({ name: 'STRNNTEMP', type: 'nvarchar', length: 50, nullable: true })
  interiorNumber: string;

  @Column({ name: 'STRCOLEMP', type: 'nvarchar', length: 150, nullable: true })
  neighborhood: string;

  @Column({ name: 'STRLOCEMP', type: 'nvarchar', length: 150, nullable: true })
  locality: string;

  @Column({ name: 'STRDMNEMP', type: 'nvarchar', length: 100, nullable: true })
  municipality: string;

  @Column({ name: 'STRREFEMP', type: 'nvarchar', length: 255, nullable: true })
  reference: string;

  @Column({ name: 'STREDOEMP', type: 'nvarchar', length: 50, nullable: true })
  state: string;

  @Column({ name: 'STRPAIEMP', type: 'nvarchar', length: 50, nullable: true })
  country: string;

  @Column({ name: 'STRCDPEMP', type: 'nvarchar', length: 5, nullable: true })
  postalCode: string;

  // TODO: review photo location
  @Column({ name: 'STRFOTEMP', type: 'nvarchar', length: 250, nullable: true })
  photo: string;

  @Column({ name: 'DTFNCEMP', type: 'nvarchar', length: 10, nullable: true })
  birthDate: string;

  @Column({ name: 'INTSEXEMP', type: 'int', nullable: true })
  gender: number; // 2 - female  1 - male

  @Column({ name: 'STRGRPSNG', type: 'nvarchar', length: 6, nullable: true })
  bloodType: string;

  @Column({ name: 'INTSTDCVL', type: 'smallint', nullable: true })
  maritalStatus: number;

  @Column({ name: 'STRNMRTLF', type: 'nvarchar', length: 12, nullable: true })
  landline: string;

  @Column({ name: 'STRNMRCLL', type: 'nvarchar', length: 12, nullable: true })
  mobile: string;

  @Column({ name: 'STRCRRELC', type: 'nvarchar', length: 50, nullable: true })
  email: string;

  @Column({ name: 'DTFCTEMP', type: 'nvarchar', length: 10, nullable: true })
  hireDate: string;

  @Column({ name: 'STRNSSEMP', type: 'nvarchar', length: 50, nullable: true })
  socialSecurityNumber: string;

  @Column({ name: 'STRDPTEMP', type: 'nvarchar', length: 255, nullable: true })
  department: string;

  @Column({ name: 'STRPSTEMP', type: 'nvarchar', length: 255, nullable: true })
  jobTitle: string;

  @Column({ name: 'BLNUSREMP', type: 'bit', nullable: true })
  isUser: boolean;

  @Column({ name: 'STRNCKEMP', type: 'nvarchar', length: 100, nullable: true })
  username: string;

  @Column({ name: 'STRPWSEMP', type: 'nvarchar', length: 100, nullable: true })
  password: string;

  @Column({ name: 'DBLPRCDST', type: 'float', nullable: true })
  statusCode: number; // Código de estado (activo/suspendido)

  @Column({ name: 'Suspendido', type: 'bit', nullable: true })
  isSuspended: boolean;

  @Column({ name: 'BLNBLQRGS', type: 'bit', nullable: true })
  isBlocked: boolean;

  @Column({ name: 'LNGCLVMPL_BLQ', type: 'int', nullable: true })
  blockedByUserId: number;

  @Column({ name: 'DTFCHRGS', type: 'nvarchar', length: 10, nullable: true })
  createdAt: string;

  @Column({ name: 'LNGCLVMPL_RGS', type: 'int', nullable: true })
  createdByUserId: number;

  @Column({ name: 'LNGCLVQPM_RGS', type: 'int', nullable: true })
  createdFromDeviceId: number;

  @Column({ name: 'DTFCHPDT', type: 'nvarchar', length: 10, nullable: true })
  updatedAt: string;

  @Column({ name: 'LNGCLVMPL_PDT', type: 'int', nullable: true })
  updatedByUserId: number;

  @Column({ name: 'LNGCLVQPM_PDT', type: 'int', nullable: true })
  updatedFromDeviceId: number;

  @VersionColumn({ name: 'SSMA_TimeStamp', type: 'rowversion' })
  version: Buffer;
}
