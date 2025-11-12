import { createParamDecorator } from '@nestjs/common';
import { GroupNotInRequestException } from 'src/auth/exceptions';

export const GetGroupId = createParamDecorator((data: any, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const groupId = req.groupId;

  if (!groupId) throw new GroupNotInRequestException();

  return groupId;
});
