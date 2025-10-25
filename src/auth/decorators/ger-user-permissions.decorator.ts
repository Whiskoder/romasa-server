import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserPermissionsNotInRequestException } from 'src/auth/exceptions';
import { ALL_PERMISSIONS_VALUES } from 'src/permissions/constants';

export const GetUserPermissions = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const isSuperAdmin = req.isSuperAdmin;

    if (isSuperAdmin) return new Set([...ALL_PERMISSIONS_VALUES]);

    const userPermissions = req.userPermissions;

    if (!userPermissions) throw new UserPermissionsNotInRequestException();

    return userPermissions;
  },
);
