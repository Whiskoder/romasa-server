import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqHeaders = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers;
  },
);
