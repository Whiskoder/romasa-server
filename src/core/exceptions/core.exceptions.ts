import { InternalServerErrorException } from '@nestjs/common';

export class UnknownException extends InternalServerErrorException {
  constructor(message = 'Internal server error') {
    super({ message, errorCode: 'SYS_ERR_UNKNOWN' });
  }
}
