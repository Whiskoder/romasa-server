import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class CustomerAlreadyExistsException extends UnprocessableEntityException {
  constructor(message = 'El cliente ya existe') {
    super({ message, errorCode: 'CST_ERR_ALREADY_EXISTS' });
  }
}

export class CustomerNotFoundException extends NotFoundException {
  constructor(message = 'El cliente no existe') {
    super({ message, errorCode: 'CST_ERR_NOT_FOUND' });
  }
}
