import { UnprocessableEntityException } from '@nestjs/common';

export class WorkshopNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Workshop no encontrado') {
    super({ message, errorCode: 'WO_ERR_WORKSHOP_NOT_FOUND' });
  }
}

export class ServiceRequestNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Servicio no encontrado') {
    super({ message, errorCode: 'WO_ERR_SERVICE_REQUEST_NOT_FOUND' });
  }
}

export class EmployeeNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Empleado no encontrado') {
    super({ message, errorCode: 'WO_ERR_EMPLOYEE_NOT_FOUND' });
  }
}
