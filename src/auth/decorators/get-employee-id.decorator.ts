import { createParamDecorator } from '@nestjs/common';
import { EmployeeNotInRequestException } from 'src/auth/exceptions';

export const GetEmployeeId = createParamDecorator((data: any, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const employeeId = req.employeeId;

  if (!employeeId) throw new EmployeeNotInRequestException();

  return employeeId;
});
