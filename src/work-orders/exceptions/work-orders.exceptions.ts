import {
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';

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

export class WorkOrderNotFoundEntityException extends UnprocessableEntityException {
  constructor(message = 'No se encontró la entidad') {
    super({ message, errorCode: 'WO_ERR_NOT_FOUND_ENTITY' });
  }
}

export class WorkOrderAlreadyScheduledException extends UnprocessableEntityException {
  constructor(message = 'La orden de trabajo ya ha sido programada') {
    super({ message, errorCode: 'WO_ERR_WORK_ORDER_ALREADY_SCHEDULED' });
  }
}
export class WorkOrderAlreadyApprovedException extends UnprocessableEntityException {
  constructor(message = 'La orden de trabajo ya ha sido aprobada') {
    super({ message, errorCode: 'WO_ERR_WORK_ORDER_ALREADY_APPROVED' });
  }
}

export class UserIsNotApproverException extends ForbiddenException {
  constructor(message = 'El usuario no puede aprobar la orden de trabajo') {
    super({ message, errorCode: 'WO_ERR_USER_IS_NOT_APPROVER' });
  }
}

export class UserAlreadyApprovedException extends UnprocessableEntityException {
  constructor(
    message = 'El usuario ya ha aprobado/rechazado la orden de trabajo',
  ) {
    super({ message, errorCode: 'WO_ERR_USER_ALREADY_APPROVED' });
  }
}
