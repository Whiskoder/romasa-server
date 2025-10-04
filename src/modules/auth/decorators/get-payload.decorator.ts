import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const payload = req.payload;

    if (!payload) return new InternalServerErrorException();

    return payload;
  },
);
