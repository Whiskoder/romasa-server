import { UnprocessableEntityException } from '@nestjs/common';

export class GroupAlreadyExistsException extends UnprocessableEntityException {
  constructor(message = 'El grupo ya existe') {
    super({ message, errorCode: 'GRP_ERR_ALREADY_EXISTS' });
  }
}

export class GroupNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Grupo no encontrado') {
    super({ message, errorCode: 'GRP_ERR_NOT_FOUND' });
  }
}

export class UsersNotFoundException extends UnprocessableEntityException {
  constructor(message = 'Usuarios no encontrados') {
    super({ message, errorCode: 'USR_ERR_NOT_FOUND' });
  }
}

export class GroupUsersNotFoundException extends UnprocessableEntityException {
  constructor(message = 'No hay usuarios en el grupo') {
    super({ message, errorCode: 'GRP_ERR_USERS_NOT_FOUND' });
  }
}
