import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ServiceStatus } from '@mod/service-operations/enums/service-status.enum';
import { Employee } from '@mod/employee/entities/employee.entity';
import { Vehicle } from '@mod/vehicles/entities/vehicle.entity';
// add relations
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

  @ManyToOne(() => Employee, (employee) => employee.id, { eager: true })
  // @Column({ type: 'int', nullable: false })
  createdByEmployee: Employee;

  @Column({ type: 'datetime', nullable: true })
  estimatedDeliveryDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.id, { eager: true })
  // @Column({ type: 'int', nullable: false })
  departmentManagerEmployee: Employee;

  // - Datos del `mecanico`

  @Column({ type: 'varchar', length: 10, nullable: false })
  folio: string;

  @Column({ type: 'varchar', length: 10, default: 'low' })
  priority: string;

  @Column({ type: 'varchar', length: 20, default: ServiceStatus.requested })
  status: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: number;

  @ManyToOne(() => Employee, (employee) => employee.id, { eager: true })
  // @Column({ type: 'int', nullable: false })
  vehicleDriverEmployee: Employee;

  @Column({ type: 'nvarchar', length: 1000, nullable: false })
  vehicleFailure: string;

  @Column({ type: 'int', nullable: false })
  vehicleFuelLevel: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id, { eager: true })
  // @Column({ type: 'int', nullable: false })
  vehicle: Vehicle;

  // TODO
  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  vehicleInventory: string;

  @Column({ type: 'int', nullable: false })
  vehicleMileage: number;
}
