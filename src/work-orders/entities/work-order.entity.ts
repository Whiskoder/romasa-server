import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Workshop } from 'src/workshops/entities/workshop.entity';
import { User } from 'src/users/entities/user.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { OrderStatus } from 'src/work-orders/enums';

export class Approval {
  @Column({ type: 'bit', default: true, nullable: false })
  requiresApproval: boolean;

  @Column({ type: 'datetime', nullable: true })
  approvalDate?: Date;

  @ManyToMany(() => User)
  @JoinTable()
  approversRequired?: User[];

  @ManyToMany(() => User)
  @JoinTable()
  approvedBy?: User[];

  @ManyToMany(() => User)
  @JoinTable()
  rejectedBy?: User[];
}
/**
 * Representa cualquier solicitud de servicio vehicular (diagnóstico,
 * reparación, pintura, hojalatería, etc)
 */
export abstract class WorkOrder {
  // /* --- Identificación --- */
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  // Establecimiento donde se realizara el servicio
  @ManyToOne(() => Workshop, (workshop) => workshop.id, {
    nullable: false,
    eager: true,
  })
  workshop: Workshop;

  // Fecha de cuando se realizará el servicio
  @Column({ type: 'datetime', nullable: true })
  scheduledDate?: Date;

  // Usuario del sistema que agendó la fecha de servicio
  @ManyToOne(() => User, (userEntity) => userEntity.id, {
    nullable: true,
    eager: true,
  })
  scheduledBy?: User;

  // Tiempo aproximado que tomara el servicio
  @Column({ type: 'int', nullable: true })
  estimatedDuration?: number;

  // Tiempo real que tomó el servicio
  @Column({ type: 'int', nullable: true })
  actualDuration?: number;

  // Empleado a cargo del servicio
  @ManyToOne(() => Employee, (employee) => employee.id, {
    nullable: true,
    eager: true,
  })
  supervisor?: Employee;

  // Empleado asignado para realizar el trabajo
  @ManyToOne(() => Employee, (employee) => employee.id, {
    nullable: true,
    eager: true,
  })
  assignedEmployee?: Employee;

  // Indica si el vehículo permanece en el establecimiento o el cliente espera
  @Column({ type: 'bit', nullable: true })
  vehicleInWorkshop?: boolean;

  // Indica si se requiere aprobación antes de ser enviado al taller
  @Column({ type: 'bit', default: true, nullable: false })
  requiresApproval: boolean;

  // Define los usuarios que deben aprobar la solicitud
  @ManyToMany(() => User)
  @JoinTable()
  approversRequired?: User[];

  // Define los usuarios que han aprobado la solicitud
  @ManyToMany(() => User)
  @JoinTable()
  approvedBy?: User[];

  // Define los usuarios que han rechazado la solicitud
  @ManyToMany(() => User)
  @JoinTable()
  rejectedBy?: User[];

  // Fecha de aprobación
  @Column({ type: 'datetime', nullable: true })
  approvalDate?: Date;

  /* --- Estado --- */
  @Column({ type: 'nvarchar', length: 25, nullable: false })
  status: OrderStatus;

  @Column({ type: 'nvarchar', length: 25, nullable: false, select: false })
  type: string;
}
