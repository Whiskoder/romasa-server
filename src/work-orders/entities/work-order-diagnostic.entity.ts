import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Employee } from 'src/employees/entities';
import { WorkOrder } from './work-order.entity';
import { ServiceRequest } from '../../service-requests/entities/service-request.entity';

/**
 * Evaluación técnica inicial del vehículo para identificar fallas,
 * determinar necesidades de reparación y generar cotización
 */
// TODO: fuelLevelAtDiagnostic, mileageAtDiagnostic
@Entity()
export class WorkOrderDiagnostic extends WorkOrder {
  // Este campo se repite para evitar la dependencia circular
  @OneToOne(() => ServiceRequest, (serviceRequest) => serviceRequest.id, {
    nullable: false,
  })
  @JoinColumn()
  serviceRequest: ServiceRequest;
  /* --- Reporte del conductor --- */
  // Empleado conductor que detectó el problema
  @ManyToOne(() => Employee, (employee) => employee.id, {
    nullable: false,
    eager: true,
  })
  reportedByDriver: Employee;

  // Lista de síntomas o fallas observadas por el conductor
  @Column({ type: 'nvarchar', length: 255, nullable: false }) // TODO: review length
  reportedSymptoms: string;

  // Indicador si el problema impide usar el vehículo de manera segura o eficiente
  @Column({ type: 'bit', nullable: false })
  impactsOperability: boolean;

  // Qué tan seguido ocurre (Constante, Intermitente, Ocasional)
  @Column({ type: 'nvarchar', length: 25, nullable: false })
  issueFrequency: string;

  /* --- Diagnostico técnico --- */
  // Descripción técnica del problema y causas identificadas
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  technicalDescription?: string;

  // Componentes o sistemas del vehiculo afectados
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  affectedSystems?: string;

  /* --- Propuesta de reparación --- */
  // Refacciones, fluidos y materiales requeridos con cantidad y especificaciones
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  requiredMaterials?: string;
}
