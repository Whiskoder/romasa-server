/**
 * Representa quien solicita el servicio
 * (Puede ser una sucursal, cliente externo, o usuario)
 */
export class Customer {
  id: string;

  name: string;

  type: 'external' | 'internal';
}
