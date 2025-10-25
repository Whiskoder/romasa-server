import { NotFoundException } from '@nestjs/common';

export class VehicleNotFoundException extends NotFoundException {
  constructor(message = 'Vehiculo no encontrado') {
    super({ message, errorCode: 'VHC_ERR_VEHICLE_NOT_FOUND' });
  }
}
