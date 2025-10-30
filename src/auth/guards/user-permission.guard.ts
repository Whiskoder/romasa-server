import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_PERMISSION } from 'src/auth/decorators';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';
import {
  UserForbiddenException,
  UserNotAssignedToGroupException,
  UserNotInRequestException,
  UserPermissionsExpiredException,
} from '../exceptions';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionCacheService: PermissionCacheService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.isSuperAdmin) return true;

    const requiredPermissions: string[] = this.reflector.getAllAndOverride<
      string[]
    >(META_PERMISSION, [context.getHandler(), context.getClass()]);

    // !warn: Aqui no asignas userPermissions
    if (!requiredPermissions) return true;
    if (!requiredPermissions.length) return true;

    const userGroupId = req.userGroupId;
    const permissionsVersion = req.permissionsVersion;

    if (!userGroupId || !permissionsVersion)
      throw new UserNotAssignedToGroupException();

    const userPermissions = this.permissionCacheService.getGroupPermissions(
      userGroupId,
      permissionsVersion,
    );

    if (userPermissions === null) throw new UserPermissionsExpiredException();

    const hasPermission = requiredPermissions.find((permission) =>
      userPermissions.has(permission),
    );

    if (!hasPermission) throw new UserForbiddenException();

    req.userPermissions = userPermissions;

    return true;
  }
}

//! TODO: el usuario debe estar asignado a un grupo
// Si no tiene un grupo asignado, asignarle por defecto al grupo 1 sin permisos
// ! TODO: jwtio signature token
