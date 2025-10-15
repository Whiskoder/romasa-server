import { Column, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

import { Workshop } from 'src/workshops/entities';
import { User } from 'src/users/entities';
import { Employee } from 'src/employees/entities';
import { OrderStatus } from 'src/work-orders/enums';

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
  @Column({ type: 'datetime', nullable: true })
  estimatedDuration?: Date;

  // Tiempo real que tomó el servicio
  @Column({ type: 'datetime', nullable: true })
  actualDuration?: Date;

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
  approversRequired?: User[];

  // Define los usuarios que han aprobado la solicitud
  @ManyToMany(() => User)
  approvedBy?: User[];

  // Define los usuarios que han rechazado la solicitud
  @ManyToMany(() => User)
  rejectedBy?: User[];

  // Fecha de aprobación
  @Column({ type: 'datetime', nullable: true })
  approvalDate?: Date;

  /* --- Estado --- */
  @Column({ type: 'nvarchar', length: 25, nullable: false })
  status: OrderStatus;
}
