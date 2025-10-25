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

export class ServiceRequestAlreadyHasAnOrderException extends UnprocessableEntityException {
  constructor(message = 'El servicio ya tiene un pedido') {
    super({ message, errorCode: 'WO_ERR_SERVICE_REQUEST_HAS_ORDER' });
  }
}

export class NoApproversConfiguredException extends UnprocessableEntityException {
  constructor(message = 'No hay aprobadores configurados') {
    super({ message, errorCode: 'WO_ERR_NO_APPROVERS_CONFIGURED' });
  }
}
