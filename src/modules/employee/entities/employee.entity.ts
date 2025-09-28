import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TBLCATEMP' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'LNGCLVEMP' })
  id: number;

  @Column({ name: 'LNGNOEMP', type: 'int', default: 0 })
  employeeNumber: number;

  @Column({ name: 'STRRFCEMP', type: 'nvarchar', length: 13 })
  rfc: string;

  @Column({ name: 'STRCRPEMP', type: 'nvarchar', length: 18 })
  curp: string;

  @Column({ name: 'STRNOMEMP', type: 'nvarchar', length: 255 })
  firstName: string;

  @Column({ name: 'STRAPPEMP', type: 'nvarchar', length: 255 })
  lastName: string;

  @Column({ name: 'STRAPMEMP', type: 'nvarchar', length: 255 })
  middleName: string;

  @Column({ name: 'STRCALEMP', type: 'nvarchar', length: 255 })
  street: string;
  @Column({ name: 'STRNXTEMP', type: 'nvarchar', length: 50 })
  exteriorNumber: string;

  @Column({ name: 'STRNNTEMP', type: 'nvarchar', length: 50 })
  interiorNumber: string;

  @Column({ name: 'STRCOLEMP', type: 'nvarchar', length: 150 })
  neighborhood: string;

  @Column({ name: 'STRLOCEMP', type: 'nvarchar', length: 150 })
  locality: string;

  @Column({ name: 'STRDMNEMP', type: 'nvarchar', length: 100 })
  municipality: string;

  @Column({ name: 'STRREFEMP', type: 'nvarchar', length: 255 })
  reference: string;

  @Column({ name: 'STREDOEMP', type: 'nvarchar', length: 50 })
  state: string;

  @Column({ name: 'STRPAIEMP', type: 'nvarchar', length: 50 })
  country: string;

  @Column({ name: 'STRCDPEMP', type: 'nvarchar', length: 5 })
  postalCode: string;

  // TODO: review photo location
  @Column({ name: 'STRFOTEMP', type: 'nvarchar', length: 250 })
  photo: string;

  @Column({ name: 'DTFNCEMP', type: 'nvarchar', length: 10 })
  birthDate: string;

  @Column({ name: 'INTSEXEMP', type: 'int' })
  gender: number; // 2 - female  1 - male

  @Column({ name: 'STRGRPSNG', type: 'nvarchar', length: 6 })
  bloodType: string;

  @Column({ name: 'INTSTDCVL', type: 'smallint' })
  maritalStatus: number;

  @Column({ name: 'STRNMRTLF', type: 'nvarchar', length: 12 })
  landline: string;

  @Column({ name: 'STRNMRCLL', type: 'nvarchar', length: 12 })
  mobile: string;

  @Column({ name: 'STRCRRELC', type: 'nvarchar', length: 50 })
  email: string;

  @Column({ name: 'DTFCTEMP', type: 'nvarchar', length: 10 })
  hireDate: string;

  @Column({ name: 'STRNSSEMP', type: 'nvarchar', length: 50 })
  socialSecurityNumber: string;

  @Column({ name: 'STRDPTEMP', type: 'nvarchar', length: 255 })
  department: string;

  @Column({ name: 'STRPSTEMP', type: 'nvarchar', length: 255 })
  jobTitle: string;

  @Column({ name: 'BLNUSREMP', type: 'bit' })
  isUser: boolean;

  @Column({ name: 'STRNCKEMP', type: 'nvarchar', length: 100 })
  username: string;

  @Column({ name: 'STRPWSEMP', type: 'nvarchar', length: 100 })
  password: string;

  @Column({ name: 'DBLPRCDST', type: 'float' })
  statusCode: number; // Código de estado (activo/suspendido)

  @Column({ name: 'Suspendido', type: 'bit' })
  isSuspended: boolean;

  @Column({ name: 'BLNBLQRGS', type: 'bit' })
  isBlocked: boolean;

  @Column({ name: 'LNGCLVMPL_BLQ', type: 'int' })
  blockedByUserId: number;

  @Column({ name: 'DTFCHRGS', type: 'nvarchar', length: 10 })
  createdAt: string;

  @Column({ name: 'LNGCLVMPL_RGS', type: 'int' })
  createdByUserId: number;

  @Column({ name: 'LNGCLVQPM_RGS', type: 'int' })
  createdFromDeviceId: number;

  @Column({ name: 'DTFCHPDT', type: 'nvarchar', length: 10 })
  updatedAt: string;

  @Column({ name: 'LNGCLVMPL_PDT', type: 'int' })
  updatedByUserId: number;

  @Column({ name: 'LNGCLVQPM_PDT', type: 'int' })
  updatedFromDeviceId: number;
}
