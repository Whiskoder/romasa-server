/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpStatus, applyDecorators, HttpCode } from '@nestjs/common';

import { ResponseMessage } from '@shared/decorators/response-message.decorator';

export function ApiResponse(httpStatus: HttpStatus, message: string) {
  return applyDecorators(
    //swaggerApiResponse
    ResponseMessage(message),
    HttpCode(httpStatus),
  );
}
