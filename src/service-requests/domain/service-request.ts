import { User } from 'src/users/entities';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { Customer } from 'src/customers/entities/customer.entity';
import { Vehicle } from 'src/vehicles/entities';
import { Exclude, Expose } from 'class-transformer';

/**
 * Contenedor maestro que agrupa una o múltiples órdenes de trabajo
 * relacionadas con un mismo vehículo y situación. Permite gestionar
 * de forma centralizada todos los trabajos derivados de una misma
 * necesidad
 */
@Exclude()
export class ServiceRequest {
  @Expose()
  id: string;

  // Identificador único para seguimiento
  @Expose()
  trackingCode: string;

  // Nivel de urgencia (baja, media, alta)
  @Expose()
  priority: ServiceRequestPriority;

  // Fecha de generación de la solicitud
  @Expose()
  createdAt: Date;

  // Fecha de último cambio realizado
  @Expose()
  updatedAt: Date;

  // Usuario del sistema que creó la solicitud
  @Expose()
  createdBy: User;

  // Usuario del sistema que actualizó la solicitud
  @Expose()
  updatedBy: User;

  // Referencia a quien solicita el servicio
  @Expose()
  requester: Customer;

  // Referencia a la unidad que recibira los servicios
  @Expose()
  vehicle: Vehicle;
}
