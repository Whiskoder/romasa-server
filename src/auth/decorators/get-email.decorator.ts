import { createParamDecorator } from '@nestjs/common';
import { EmailNotInRequestException } from 'src/auth/exceptions';

export const GetEmail = createParamDecorator((data: any, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const email = req.email;

  if (!email) throw new EmailNotInRequestException();

  return email;
});
