import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { PayloadNotInRequestException } from 'src/auth/exceptions';

export const GetPayload = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const payload = req.payload;

    if (!payload) throw new PayloadNotInRequestException();

    return payload;
  },
);
