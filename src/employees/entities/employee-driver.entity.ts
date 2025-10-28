import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TBLCHFTRN_CP', synchronize: false })
export class EmployeeDriver {
  @PrimaryColumn({ name: 'LNGCLVCHF' })
  id: number;
  // Identificador del registro del empleado
  @Column({ name: 'LNGCLVEMP', type: 'long', nullable: true, default: 0 })
  employeeId: number;

  // Identificador de la figura transporte
  @Column({ name: 'STRCLVFTR', type: 'nvarchar', length: 3, nullable: true })
  STRCLVFTR;

  // Número de licencia
  @Column({ name: 'STRNMRLCN', type: 'nvarchar', length: 16, nullable: true })
  STRNMRLCN: string;

  // Expedición de la licencia
  @Column({ name: 'DTXPDLCN', type: 'nvarchar', length: 10, nullable: true })
  DTXPDLCN: string;

  // Vigencia de la licencia
  @Column({ name: 'DTVGNLCN', type: 'nvarchar', length: 10, nullable: true })
  DTVGNLCN: string;

  // Tipo de licencia
  @Column({ name: 'STRTPOLCN', type: 'nvarchar', length: 2, nullable: true })
  STRTPOLCN: string;

  // Estado de registro
  @Column({ name: 'BLNRGSDLT', type: 'bit', nullable: true, default: 0 })
  BLNRGSDLT;

  // Fecha de alta de registro
  @Column({ name: 'DTFCHRGS', type: 'nvarchar', length: 25, nullable: true })
  DTFCHRGS;

  // Clave del usuario quien dio de alta el registro
  @Column({ name: 'LNGCLVMPL_BLQ', type: 'double', nullable: true, default: 0 })
  LNGCLVMPL_BLQ;

  // Clave del equipo donde se dio de alta el registro
  @Column({ name: 'LNGCLVQPM_RGS', type: 'long', nullable: true, default: 0 })
  LNGCLVQPM_RGS;

  // Fecha de la última vez que se modificó el registro
  @Column({ name: 'DTFCHPDT', type: 'nvarchar', length: 25, nullable: true })
  DTFCHPDT;

  // Clave del usuario quien modifico por última vez el registro
  @Column({ name: 'LNGCLVMPL_PDT', type: 'double', nullable: true, default: 0 })
  LNGCLVMPL_PDT;

  // Clave del equipo donde modifico por última vez el registro
  @Column({ name: 'LNGCLVQPM_PDT', type: 'long', nullable: true, default: 0 })
  LNGCLVQPM_PDT;
}
