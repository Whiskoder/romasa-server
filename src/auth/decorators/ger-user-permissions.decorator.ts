import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserPermissionsNotInRequestException } from 'src/auth/exceptions';

export const GetUserPermissions = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userPermissions = req.userPermissions;

    if (!userPermissions) throw new UserPermissionsNotInRequestException();

    return userPermissions;
  },
);
