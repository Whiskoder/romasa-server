import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'TBLTRNVHC_CP' })
export class Vehicle {
  @PrimaryColumn({ name: 'LNGDNTTRN', type: 'int' })
  id: number;

  @Column({ name: 'STRNMRTRN', type: 'nvarchar', length: 5, nullable: true })
  transportNumber?: string;

  @Column({ name: 'STRCLVTPV', type: 'nvarchar', length: 10, nullable: true })
  transportTypeCode?: string;

  @Column({ name: 'LNGCLVSTP', type: 'int', nullable: true })
  transportSubTypeId?: number;

  @Column({ name: 'STRMRCTRN', type: 'nvarchar', length: 30, nullable: true })
  brand?: string;

  @Column({ name: 'STRMDLTRN', type: 'nvarchar', length: 20, nullable: true })
  model?: string;

  @Column({ name: 'STRAÑOTRN', type: 'nvarchar', length: 4, nullable: true })
  manufactureYear?: string;

  @Column({ name: 'STRNSRTRN', type: 'nvarchar', length: 20, nullable: true })
  verificationNumber?: string;

  @Column({ name: 'DCMPBRTRN', type: 'float', nullable: true })
  grossWeight?: number;

  @Column({ name: 'STRPLCTRN', type: 'nvarchar', length: 7, nullable: true })
  licensePlate?: string;

  @Column({ name: 'LNGKLMVHC', type: 'int', nullable: true })
  mileage?: number;

  @Column({ name: 'LNGSTTTRN', type: 'smallint', nullable: true })
  operationalStatus?: number;

  @Column({ name: 'DTFCHMNT', type: 'datetime2', precision: 0, nullable: true })
  lastMaintenanceDate?: Date;

  @Column({ name: 'LNGCLVENT', type: 'int', nullable: true })
  entityId?: number;

  @Column({ name: 'LNGCLVCHF', type: 'int', nullable: true })
  assignedEmployeeId?: number;

  @Column({ name: 'LNGTPOASG', type: 'smallint', nullable: true })
  assignmentType?: number;

  @Column({ name: 'DTFCHADQ', type: 'datetime2', precision: 0, nullable: true })
  acquisitionDate?: Date;

  @Column({ name: 'MNDIMPADQ', type: 'money', nullable: true })
  acquisitionAmount?: number;

  @Column({ name: 'LNGMTDADQ', type: 'nvarchar', length: 255, nullable: true })
  acquisitionMethod?: string;

  @Column({ name: 'LNGVDAUTL', type: 'nvarchar', length: 255, nullable: true })
  usefulLife?: string;

  @Column({ name: 'STRCLVCTT', type: 'nvarchar', length: 10, nullable: true })
  vehicleConfigCode?: string;

  @Column({ name: 'STRCLVTRN', type: 'nvarchar', length: 2, nullable: true })
  transportCode?: string;

  @Column({ name: 'STRPRMTRN', type: 'nvarchar', length: 6, nullable: true })
  sctPermitType?: string;

  @Column({ name: 'STRNPRTRN', type: 'nvarchar', length: 15, nullable: true })
  sctPermitNumber?: string;

  @Column({ name: 'STRSGRTRN', type: 'nvarchar', length: 50, nullable: true })
  riskInsurer?: string;

  @Column({ name: 'STRNPLTRN', type: 'nvarchar', length: 30, nullable: true })
  riskPolicyNumber?: string;

  @Column({ name: 'STRSGRMTRN', type: 'nvarchar', length: 50, nullable: true })
  environmentalInsurer?: string;

  @Column({ name: 'STRNPLMTRN', type: 'nvarchar', length: 30, nullable: true })
  environmentalPolicyNumber?: string;

  @Column({ name: 'STRSGRCTRN', type: 'nvarchar', length: 50, nullable: true })
  cargoInsurer?: string;

  @Column({ name: 'STRNPLCTRN', type: 'nvarchar', length: 30, nullable: true })
  cargoPolicyNumber?: string;

  @Column({
    name: 'DTFCHRGS',
    type: 'datetime2',
    precision: 0,
    nullable: false,
    default: () => 'getdate()',
  })
  createdAt: Date;

  @Column({ name: 'LNGCLVMPL_RGS', type: 'int', nullable: true })
  createdByUserId?: number;

  @Column({ name: 'LNGCLVQPM_RGS', type: 'int', nullable: true })
  createdFromDeviceId?: number;

  @Column({
    name: 'DTFCHPDT',
    type: 'datetime2',
    precision: 0,
    nullable: false,
    default: () => 'getdate()',
  })
  updatedAt: Date;

  @Column({ name: 'LNGCLVMPL_PDT', type: 'int', nullable: true })
  updatedByUserId?: number;

  @Column({ name: 'LNGCLVQPM_PDT', type: 'int', nullable: true })
  updatedFromDeviceId?: number;

  @Column({ name: 'SSMA_TimeStamp', type: 'int' })
  version: number;
}
