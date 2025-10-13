/*



export const Permissions = (...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);

// permission.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permission[]>(PERMISSIONS_KEY, context.getHandler());
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.some(permission => user.permissions.includes(permission));
  }
}

// controller.ts
@UseGuards(PermissionGuard)
@Permissions(Permission.see_all_service_diagnosis, Permission.see_own_service_diagnosis, Permission.see_branch_service_diagnosis)
@Get('service-diagnosis')
async getServiceDiagnosis(@Req() req) {
  const user = req.user;
  if (user.permissions.includes(Permission.see_all_service_diagnosis)) {
    return this.service.findAll();
  }
  if (user.permissions.includes(Permission.see_branch_service_diagnosis)) {
    return this.service.findByBranch(user.branchId);
  }
  if (user.permissions.includes(Permission.see_own_service_diagnosis)) {
    return this.service.findByOwner(user.id);
  }
  return [];
}
  */
