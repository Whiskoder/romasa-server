import { User } from 'src/users/domain';
import { ServiceRequestPriority } from 'src/service-requests/enums';
import { Customer } from 'src/customers/domain';
import { Vehicle } from 'src/vehicles/domain';

/**
 * Contenedor maestro que agrupa una o múltiples órdenes de trabajo
 * relacionadas con un mismo vehículo y situación. Permite gestionar
 * de forma centralizada todos los trabajos derivados de una misma
 * necesidad
 */
export class ServiceRequest {
  id: string;

  // Identificador único para seguimiento

  trackingCode: string;

  // Nivel de urgencia (baja, media, alta)

  priority: ServiceRequestPriority;

  // Fecha de generación de la solicitud

  createdAt: Date;

  // Fecha de último cambio realizado

  updatedAt: Date;

  // Usuario del sistema que creó la solicitud

  createdBy: User;

  // Usuario del sistema que actualizó la solicitud

  updatedBy: User;

  // Referencia a quien solicita el servicio

  requester: Customer;

  // Referencia a la unidad que recibira los servicios

  vehicle: Vehicle;
}
