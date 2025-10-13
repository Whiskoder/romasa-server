import { Employee } from 'src/employees/domain';
import { IssueFrequency, RepairType } from 'src/work-orders/enums';
import { WorkOrder } from 'src/work-orders/domain';

/**
 * Evaluación técnica inicial del vehículo para identificar fallas,
 * determinar necesidades de reparación y generar cotización
 */
export class WorkOrderDiagnostic {
  /* --- Identificación --- */
  id: string;

  // Referencia a la solicitud de servicio vehicular padre
  workOrder: WorkOrder;

  /* --- Reporte del conductor --- */
  // Empleado conductor que detectó el problema
  reportedByDriver: Employee;

  // Lista de síntomas o fallas observadas por el conductor
  reportedSymptoms: string[];

  // Indicador si el problema impide usar el vehículo de manera segura o eficiente
  impactsOperability: boolean;

  // Qué tan seguido ocurre (Constante, Intermitente, Ocasional)
  issueFrequency: IssueFrequency;

  /* --- Diagnostico técnico --- */
  // Descripción técnica del problema y causas identificadas
  technicalDescription?: string[];

  // Componentes o sistemas del vehiculo afectados
  affectedSystems?: RepairType[];

  /* --- Propuesta de reparación --- */
  // Refacciones, fluidos y materiales requeridos con cantidad y especificaciones
  requiredMaterials?: string[];
}
