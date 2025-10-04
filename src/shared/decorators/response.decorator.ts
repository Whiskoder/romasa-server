import { HttpStatus, applyDecorators, HttpCode } from '@nestjs/common';

import { ResponseMessage } from 'src/shared/decorators';

export function ApiResponse(httpStatus: HttpStatus, message: string) {
  return applyDecorators(
    //swaggerApiResponse
    ResponseMessage(message),
    HttpCode(httpStatus),
  );
}
