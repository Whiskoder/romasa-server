import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

import { RESPONSE_MESSAGE_KEY } from '@shared/decorators/response-message.decorator';
// import { DatabaseLogger } from '@mod/logger/database-logger.service';
import { CreateHttpLogDto } from '@mod/logger/dtos/create-http-log.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    // private readonly logger: DatabaseLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.getAllAndOverride<any>(
      RESPONSE_MESSAGE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [200, 'Request successful'];

    return next
      .handle()
      .pipe(map((data) => this.responseHandler(data, context, message)));
  }

  private responseHandler(
    data: unknown,
    context: ExecutionContext,
    message: string,
  ) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode;
    const status = true;
    const createHttpLogDto = CreateHttpLogDto({
      context: 'ResponseInterceptor',
      data,
      message,
      request,
      status,
      statusCode,
    });
    // this.logger.httpSuccess(createHttpLogDto);

    return {
      message,
      path: createHttpLogDto.requestPath,
      result: data ?? null,
      status,
      statusCode,
      timestamp: createHttpLogDto.responseTimestamp,
    };
  }
}
