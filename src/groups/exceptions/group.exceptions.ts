import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class GroupAlreadyExistsEntityException extends UnprocessableEntityException {
  constructor(message = 'El grupo ya existe') {
    super({ message, errorCode: 'GRP_ERR_ALREADY_EXISTS' });
  }
}

export class GroupNotFoundEntityException extends UnprocessableEntityException {
  constructor(message = 'Grupo no encontrado') {
    super({ message, errorCode: 'GRP_ERR_NOT_FOUND' });
  }
}

export class GroupNotFoundException extends NotFoundException {
  constructor(message = 'Grupo(s) no encontrado') {
    super({ message, errorCode: 'GRP_ERR_NOT_FOUND' });
  }
}

export class UsersNotFoundEntityException extends UnprocessableEntityException {
  constructor(message = 'Usuarios no encontrados') {
    super({ message, errorCode: 'USR_ERR_NOT_FOUND' });
  }
}

export class GroupUsersNotFoundEntityException extends UnprocessableEntityException {
  constructor(message = 'No hay usuarios en el grupo') {
    super({ message, errorCode: 'GRP_ERR_USERS_NOT_FOUND' });
  }
}
