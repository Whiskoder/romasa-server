import { WorkOrder } from 'src/work-orders/domain';

export class WorkOrderService {
  /* --- Identificación --- */
  id: string;

  // Referencia a la solicitud de servicio vehicular padre
  workOrder: WorkOrder;

  /* --- Condiciones generales --- */
  // Cantidad de combustible al recibir el vehiculo
  fuelLevelAtReception?: number;

  // Kilómetros recorridos al recibir el vehiculo
  mileageAtReception?: number;

  // Lista de elementos presentes (Gato, Llanta de refacción, etc) al recibir el vehiculo
  receivedInventoryItems?: string[];

  /* --- Inspection visual de daños --- */
  // Lista de observaciones del techo
  roofObservations?: string[];

  // Lista de observaciones del frente
  frontObservations?: string[];

  // Lista de observaciones del lado izquierdo
  leftSideObservations?: string[];

  // Lista de observaciones del lado derecho
  rightSideObservations?: string[];

  // Lista de observaciones del trasero
  rearObservations?: string[];

  /* --- Trabajo realizado --- */
  // Detalle completo de todo el trabajo realizado
  performedServices?: string[];

  // Lista de piezas nuevas colocadas con número de parte y cantidad
  installedReplacementParts?: string[];

  // lista de aceites, refrigerantes y otros líquidos cambiados o rellenados con tipo y cantidad
  addedFluids?: string[];
}
