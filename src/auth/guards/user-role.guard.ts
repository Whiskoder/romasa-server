import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

import { META_ROLES } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { Roles } from 'src/users/enums';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.getAllAndOverride<string[]>(
      META_ROLES,
      [context.getHandler(), context.getClass()],
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userRole = req.role as Roles;

    if (!userRole)
      throw new InternalServerErrorException('User role not found');

    for (let role of validRoles) {
      if (userRole === role) return true;
    }

    throw new ForbiddenException('User does not have the required roles');
  }
}
