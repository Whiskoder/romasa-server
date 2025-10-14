import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(message = 'Credenciales incorrectas') {
    super({ message, errorCode: 'AUTH_ERR_INVALID_CREDENTIALS' });
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = 'Token no válido') {
    super({ message, errorCode: 'AUTH_ERR_INVALID_TOKEN' });
  }
}

export class UserNoLongerActiveException extends UnauthorizedException {
  constructor(message = 'El usuario ya no esta disponible') {
    super({ message, errorCode: 'AUTH_ERR_USER_NOT_ACTIVE' });
  }
}

export class UserNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el usuario en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_USER_MISSING' });
  }
}

export class PayloadNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el payload en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_PAYLOAD_MISSING' });
  }
}
