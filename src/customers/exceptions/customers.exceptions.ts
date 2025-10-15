import { UnprocessableEntityException } from '@nestjs/common';

export class CustomerAlreadyExistsException extends UnprocessableEntityException {
  constructor(message = 'El cliente ya existe') {
    super({ message, errorCode: 'CST_ERR_ALREADY_EXISTS' });
  }
}
