import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ServiceStatus } from '@mod/service-operations/enums/service-status.enum';

@Entity({ name: 'service_operations' })
export class ServiceOperation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bit', default: false })
  affectsOperability: boolean;

  @Column({ type: 'varchar', length: 20, nullable: false })
  branch: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: number;

  @Column({ type: 'int', nullable: false })
  createdByEmployeeId: number;

  @Column({ type: 'datetime', nullable: true })
  estimatedDeliveryDate: Date;

  @Column({ type: 'int', nullable: false })
  departmentManagerEmployeeId: number;

  // - Datos del `mecanico`

  @Column({ type: 'varchar', length: 10, nullable: false })
  folio: string;

  @Column({ type: 'varchar', length: 10, default: 'low' })
  priority: string;

  @Column({ type: 'varchar', length: 20, default: ServiceStatus.requested })
  status: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: number;

  @Column({ type: 'int', nullable: false })
  vehicleDriverEmployeeId: number;

  @Column({ type: 'nvarchar', length: 1000, nullable: false })
  vehicleFailure: string;

  @Column({ type: 'int', nullable: false })
  vehicleFuelLevel: number;

  @Column({ type: 'int', nullable: false })
  vehicleId: number;

  // TODO
  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  vehicleInventory: string;

  @Column({ type: 'int', nullable: false })
  vehicleMileage: number;
}
