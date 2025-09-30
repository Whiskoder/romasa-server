import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'service_operations' })
export class ServiceOperations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bit', default: false })
  affectsOperability: boolean;

  @Column({ type: 'varchar', length: 20, nullable: false })
  branch: string;

  @Column({ type: 'datetime', nullable: false })
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

  @Column({ type: 'varchar', length: 20, default: 'created' })
  status: string;

  @Column({ type: 'datetime', nullable: false })
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
