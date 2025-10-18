import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserNotInRequestException } from 'src/auth/exceptions';

export const GetUserId = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.userId;

    if (!userId) throw new UserNotInRequestException();

    return userId;
  },
);
