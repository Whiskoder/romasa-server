import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from 'src/users/entities';

type UserProperties =
  | {
      [key in keyof User]: User[key] extends Function ? never : key;
    }[keyof User]
  | 'email';

export const GetUser = createParamDecorator(
  (data: UserProperties, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) return new InternalServerErrorException();

    return !data ? user : user[data];
  },
);
