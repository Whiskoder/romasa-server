import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserNotInRequestException } from 'src/auth/exceptions';

export const GetUserGroupId = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userGroupId = req.userGroupId;

    if (!userGroupId) throw new UserNotInRequestException();

    return userGroupId;
  },
);
