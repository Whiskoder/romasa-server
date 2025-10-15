import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { ServiceRequest } from '../../service-requests/entities/service-request.entity';

@Entity()
export class WorkOrderService extends WorkOrder {
  // Este campo se repite para evitar la dependencia circular
  @OneToOne(() => ServiceRequest, (serviceRequest) => serviceRequest.id, {
    nullable: false,
  })
  @JoinColumn()
  serviceRequest: ServiceRequest;
  /* --- Condiciones generales --- */
  // Cantidad de combustible al recibir el vehiculo
  @Column({ type: 'int', nullable: true })
  fuelLevelAtReception?: number;

  // Kilómetros recorridos al recibir el vehiculo
  @Column({ type: 'int', nullable: true })
  mileageAtReception?: number;

  // Lista de elementos presentes (Gato, Llanta de refacción, etc) al recibir el vehiculo
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  receivedInventoryItems?: string;

  /* --- Inspection visual de daños --- */
  // Lista de observaciones del techo
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  roofObservations?: string;

  // Lista de observaciones del frente
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  frontObservations?: string;

  // Lista de observaciones del lado izquierdo
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  leftSideObservations?: string;

  // Lista de observaciones del techo
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rightSideObservations?: string;

  // Lista de observaciones del trasero
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  rearObservations?: string;

  /* --- Trabajo realizado --- */
  // Detalle completo de todo el trabajo realizado
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  performedServices?: string;

  // Lista de piezas nuevas colocadas con número de parte y cantidad
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  installedReplacementParts?: string;

  // lista de aceites, refrigerantes y otros líquidos cambiados o rellenados con tipo y cantidad
  @Column({ type: 'nvarchar', length: 255, nullable: true }) // TODO: review length
  addedFluids?: string;
}
