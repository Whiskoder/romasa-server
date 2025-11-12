import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

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

export class EmployeeNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el empleado en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_EMPLOYEE_MISSING' });
  }
}

export class GroupNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el grupo en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_GROUP_MISSING' });
  }
}

export class EmailNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el email en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_EMAIL_MISSING' });
  }
}

export class UserPermissionsNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontraron los permisos del usuario en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_USER_MISSING_PERMISSIONS' });
  }
}

export class PayloadNotInRequestException extends UnauthorizedException {
  constructor(
    message = 'No se encontró el payload en la solicitud. ¿Falta un guard de autenticación?',
  ) {
    super({ message, errorCode: 'AUTH_ERR_PAYLOAD_MISSING' });
  }
}

export class UserNotAssignedToGroupException extends ForbiddenException {
  constructor(message = 'El usuario no está asignado a un grupo') {
    super({ message, errorCode: 'AUTH_ERR_USER_NOT_ASSIGNED_TO_GROUP' });
  }
}

export class UserForbiddenException extends ForbiddenException {
  constructor(message = 'No tiene permisos suficientes') {
    super({ message, errorCode: 'AUTH_ERR_USER_FORBIDDEN' });
  }
}

export class UserPermissionsExpiredException extends UnauthorizedException {
  constructor(message = 'Permisos expirados, actualice su sesión') {
    super({ message, errorCode: 'AUTH_ERR_USER_PERMISSIONS_EXPIRED' });
  }
}

export class OneTimeTokenNotFoundException extends UnauthorizedException {
  constructor(message = 'Token de un solo uso no encontrado') {
    super({ message, errorCode: 'AUTH_ERR_ONE_TIME_TOKEN_NOT_FOUND' });
  }
}

export class InvalidNonceException extends BadRequestException {
  constructor(message = 'Formato de Nonce no válido') {
    super({ message, errorCode: 'AUTH_ERR_INVALID_NONCE' });
  }
}

export class NonceNotInHeaderException extends BadRequestException {
  constructor(message = 'No se encontro el header x-auth-nonce') {
    super({ message, errorCode: 'AUTH_ERR_NONCE_NOT_IN_HEADER' });
  }
}
