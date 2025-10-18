import { UnprocessableEntityException } from '@nestjs/common';

export class WorkshopAlreadyExistsException extends UnprocessableEntityException {
  constructor(message = 'El taller ya existe') {
    super({ message, errorCode: 'WSH_ERR_ALREADY_EXISTS' });
  }
}
