import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TBLCATEMP' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'LNGCLVEMP' })
  id: number; // ID del registro

  @Column({ name: 'LNGNOEMP', type: 'int', default: 0 })
  employeeNumber: number; // Número de registro del empleado

  @Column({ name: 'STRRFCEMP', type: 'nvarchar', length: 13 })
  rfc: string; // RFC del empleado

  @Column({ name: 'STRCRPEMP', type: 'nvarchar', length: 18 })
  curp: string; // CURP del empleado

  @Column({ name: 'STRNOMEMP', type: 'nvarchar', length: 255 })
  firstName: string; // Nombre del empleado

  @Column({ name: 'STRAPPEMP', type: 'nvarchar', length: 255 })
  lastName: string; // Apellido paterno

  @Column({ name: 'STRAPMEMP', type: 'nvarchar', length: 255 })
  middleName: string; // Apellido materno

  @Column({ name: 'STRCALEMP', type: 'nvarchar', length: 255 })
  street: string; // Calle del domicilio

  @Column({ name: 'STRNXTEMP', type: 'nvarchar', length: 50 })
  exteriorNumber: string; // Número exterior

  @Column({ name: 'STRNNTEMP', type: 'nvarchar', length: 50 })
  interiorNumber: string; // Número interior

  @Column({ name: 'STRCOLEMP', type: 'nvarchar', length: 150 })
  neighborhood: string; // Colonia

  @Column({ name: 'STRLOCEMP', type: 'nvarchar', length: 150 })
  locality: string; // Localidad

  @Column({ name: 'STRDMNEMP', type: 'nvarchar', length: 100 })
  municipality: string; // Delegación / Municipio

  @Column({ name: 'STRREFEMP', type: 'nvarchar', length: 255 })
  reference: string; // Referencia

  @Column({ name: 'STREDOEMP', type: 'nvarchar', length: 50 })
  state: string; // Estado

  @Column({ name: 'STRPAIEMP', type: 'nvarchar', length: 50 })
  country: string; // País

  @Column({ name: 'STRCDPEMP', type: 'nvarchar', length: 5 })
  postalCode: string; // Código postal

  @Column({ name: 'STRFOTEMP', type: 'nvarchar', length: 250 })
  photoUrl: string; // URL de la foto del empleado

  @Column({ name: 'DTFNCEMP', type: 'nvarchar', length: 10 })
  birthDate: string; // Fecha de nacimiento

  @Column({ name: 'INTSEXEMP', type: 'int' })
  gender: number; // 0 = Masculino, 1 = Femenino (según tu aplicación)

  @Column({ name: 'STRGRPSNG', type: 'nvarchar', length: 6 })
  bloodType: string; // Grupo sanguíneo

  @Column({ name: 'INTSTDCVL', type: 'smallint' })
  maritalStatus: number; // Estado civil

  @Column({ name: 'STRNMRTLF', type: 'nvarchar', length: 12 })
  landline: string; // Teléfono fijo

  @Column({ name: 'STRNMRCLL', type: 'nvarchar', length: 12 })
  mobile: string; // Teléfono celular

  @Column({ name: 'STRCRRELC', type: 'nvarchar', length: 50 })
  email: string; // Correo electrónico

  @Column({ name: 'DTFCTEMP', type: 'nvarchar', length: 10 })
  hireDate: string; // Fecha de contratación

  @Column({ name: 'STRNSSEMP', type: 'nvarchar', length: 50 })
  socialSecurityNumber: string; // Número de Seguridad Social

  @Column({ name: 'STRDPTEMP', type: 'nvarchar', length: 255 })
  department: string; // Departamento del empleado

  @Column({ name: 'STRPSTEMP', type: 'nvarchar', length: 255 })
  jobTitle: string; // Puesto del empleado

  @Column({ name: 'BLNUSREMP', type: 'bit' })
  isUser: boolean; // ¿Es usuario del sistema?

  @Column({ name: 'STRNCKEMP', type: 'nvarchar', length: 100 })
  username: string; // Nombre de usuario en el sistema

  @Column({ name: 'STRPWSEMP', type: 'nvarchar', length: 100 })
  password: string; // Contraseña del sistema

  @Column({ name: 'DBLPRCDST', type: 'float' })
  statusCode: number; // Código de estado (activo/suspendido)

  @Column({ name: 'Suspendido', type: 'bit' })
  isSuspended: boolean; // ¿Está suspendido?

  @Column({ name: 'BLNBLQRGS', type: 'bit' })
  isBlocked: boolean; // Estado de bloqueo del registro

  @Column({ name: 'LNGCLVMPL_BLQ', type: 'int' })
  blockedByUserId: number; // Clave de usuario que bloqueó

  @Column({ name: 'DTFCHRGS', type: 'nvarchar', length: 10 })
  createdAt: string; // Fecha de alta del registro

  @Column({ name: 'LNGCLVMPL_RGS', type: 'int' })
  createdByUserId: number; // Usuario que dio de alta

  @Column({ name: 'LNGCLVQPM_RGS', type: 'int' })
  createdFromDeviceId: number; // Equipo desde donde se dio de alta

  @Column({ name: 'DTFCHPDT', type: 'nvarchar', length: 10 })
  updatedAt: string; // Fecha de última modificación

  @Column({ name: 'LNGCLVMPL_PDT', type: 'int' })
  updatedByUserId: number; // Usuario que modificó

  @Column({ name: 'LNGCLVQPM_PDT', type: 'int' })
  updatedFromDeviceId: number; // Equipo desde donde se modificó
}
