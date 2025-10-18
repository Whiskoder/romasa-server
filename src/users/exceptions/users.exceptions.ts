import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message = 'El usuario no existe') {
    super({ message, errorCode: 'USR_ERR_NOT_FOUND' });
  }
}

export class UserAlreadyExistsException extends UnprocessableEntityException {
  constructor(message = 'El usuario ya existe') {
    super({ message, errorCode: 'USR_ERR_ALREADY_EXISTS' });
  }
}

export class UserEmployeeNotFoundException extends UnprocessableEntityException {
  constructor(message = 'El empleado no existe') {
    super({ message, errorCode: 'USR_ERR_EMPLOYEE_NOT_FOUND' });
  }
}
