import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkOrderDiagnostic } from '../../work-orders/entities/work-order-diagnostic.entity';
import { WorkOrderService } from '../../work-orders/entities/work-order-service.entity';
import { ServiceRequestStatus } from 'src/service-requests/enums';

/**
 * Contenedor maestro que agrupa una o múltiples órdenes de trabajo
 * relacionadas con un mismo vehículo y situación. Permite gestionar
 * de forma centralizada todos los trabajos derivados de una misma
 * necesidad
 */
@Entity()
export class ServiceRequest {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  // Identificador único para seguimiento
  @Column({ type: 'nvarchar', length: 10, nullable: false })
  trackingCode: string;

  // Nivel de urgencia (baja, media, alta)
  @Column({ type: 'nvarchar', length: 25, nullable: false })
  priority: string;

  // Fecha de generación de la solicitud
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  // Fecha de último cambio realizado
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  // Usuario del sistema que creó la solicitud
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn()
  createdBy: User;

  // Usuario del sistema que actualizó la solicitud
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  updatedBy: User;

  // Referencia a quien solicita el servicio
  @ManyToOne(() => Customer, (customer) => customer.id, {
    nullable: false,
  })
  requester: Customer;

  // Referencia a la unidad que recibira los servicios
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id, {
    nullable: false,
  })
  vehicle: Vehicle;

  // Referencia a las órdenes de trabajo que pertenecen a la solicitud
  @OneToOne(() => WorkOrderService, (workOrder) => workOrder.serviceRequest, {
    eager: true,
  })
  service: WorkOrderService;

  @OneToOne(
    () => WorkOrderDiagnostic,
    (workOrder) => workOrder.serviceRequest,
    { eager: true },
  )
  diagnostic: WorkOrderDiagnostic;

  @Column({ type: 'nvarchar', length: 30, nullable: false })
  status: ServiceRequestStatus;
}
