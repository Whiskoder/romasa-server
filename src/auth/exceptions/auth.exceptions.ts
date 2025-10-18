import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

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
