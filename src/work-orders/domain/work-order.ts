import { Employee } from 'src/employees/domain';
import { OrderStatus } from 'src/work-orders/enums';
import { User } from 'src/users/domain';
import { Workshop } from 'src/workshops/domain';
import { WorkOrderType } from 'src/work-orders/types';
import { WorkOrderDiagnostic, WorkOrderService } from 'src/work-orders/domain';

// TODO: should createdAt?
/**
 * Representa cualquier solicitud de servicio vehicular (diagnóstico,
 * reparación, pintura, hojalatería, etc)
 */
export class WorkOrder {
  /* --- Identificación --- */
  id: string;

  // Tipo de trabajo (diagnóstico, servicio, pintura, etc)
  type: WorkOrderType;

  // Establecimiento donde se realizara el servicio
  workshop: Workshop;

  diagnostic?: WorkOrderDiagnostic;

  service?: WorkOrderService;

  /* --- Programación del servicio --- */
  // Fecha de cuando se realizará el servicio
  scheduledDate?: Date;

  // Usuario del sistema que agendó la fecha de servicio
  scheduledBy?: User;

  // Tiempo aproximado que tomara el servicio
  estimatedDuration?: Date;

  // Tiempo real que tomó el servicio
  actualDuration?: Date;

  // Empleado a cargo del servicio
  supervisor?: Employee;

  // Empleado asignado para realizar el trabajo
  assignedEmployee?: Employee;

  // Indica si el vehículo permanece en el establecimiento o el cliente espera
  vehicleInWorkshop?: boolean;

  /* --- Flujo de aprobación --- */
  // Indica si se requiere aprobación antes de ser enviado al taller
  requiresApproval: boolean;

  // Define los usuarios que deben aprobar la solicitud
  approversRequired?: User[];

  // Define los usuarios que han aprobado la solicitud
  approvedBy?: User[];

  // Define los usuarios que han rechazado la solicitud
  rejectedBy?: User[];

  // Fecha de aprobación
  approvalDate?: Date;

  /* --- Estado --- */
  status: OrderStatus;
}
