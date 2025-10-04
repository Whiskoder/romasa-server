import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateHttpLogDto } from 'src/logger/dtos/create-http-log.dto';
import { AllConfigType } from 'src/config/config.type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly environment: string;

  constructor(
    private readonly configService: ConfigService<AllConfigType, true>,
    // private readonly logger: DatabaseLogger,
  ) {
    this.environment = this.configService.get<string>('server.mode', {
      infer: true,
    });
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionRes = exception.getResponse();
    const message = exceptionRes['message'] ?? null;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const status = false;

    const createHttpLogDto = CreateHttpLogDto({
      context: 'HttpExceptionFilter',
      message,
      request,
      status,
      statusCode,
    });
    // this.logger.httpError(createHttpLogDto);

    const responseBody: Record<string, unknown> = {
      message: STATUS_CODES[statusCode],
      path: createHttpLogDto.requestPath,
      result: null,
      status,
      statusCode,
      timestamp: new Date(),
    };

    if (this.environment === 'development') responseBody.result = message;

    response.status(statusCode).json(responseBody);
  }
}
