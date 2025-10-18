import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class CustomerNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Customer no encontrado') {
    super({ message, errorCode: 'SRR_ERR_CUSTOMER_NOT_FOUND' });
  }
}

export class VehicleNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Vehículo no encontrado') {
    super({ message, errorCode: 'SRR_ERR_VEHICLE_NOT_FOUND' });
  }
}

export class UserNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Usuario no encontrado') {
    super({ message, errorCode: 'SRR_ERR_USER_NOT_FOUND' });
  }
}

export class ServiceRequestNotFoundException extends NotFoundException {
  constructor(message = 'Solicitud de servicio no encontrada') {
    super({ message, errorCode: 'SRR_ERR_SERVICE_REQUEST_NOT_FOUND' });
  }
}
