/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus } from '@nestjs/common';

import { HttpMethod } from '@shared/enums/http-methods.enum';

export interface RequestUser {
  id: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
}

export interface ICreateHttpLogDto {
  context: string;
  message: string;
  requestAuthMethod?: string;
  requestBody?: Record<string, unknown>;
  requestIp: string;
  requestMethod: HttpMethod;
  requestParams?: Record<string, unknown>;
  requestPath: string;
  requestUser?: RequestUser;
  requestUserAgent: string;
  responseMessage: string;
  responseStatus: boolean;
  responseStatusCode: HttpStatus;
  responseTimestamp: Date;
  responseResult?: Record<string, unknown>;
}

export interface CreateHttpLogOpts {
  context: string;
  request: any;
  response?: any;
  message: string;
  status: boolean;
  statusCode: HttpStatus;
  data?: unknown;
}

const filterSensitiveRequestBody = (body: any) => {
  const { password, email, ...safe } = body;
  return safe;
};

const filterSensitiveUser = (user: any) => {
  return {
    id: user.id,
    isActive: user.isActive,
    role: user.role,
    createdAt: user.createdAt,
  };
};

const filterSensitiveResult = (result: any) => {
  const data = structuredClone(result);

  delete data?.user?.firstName;
  delete data?.user?.lastName;
  delete data?.user?.email;

  return data;
};

export const CreateHttpLogDto = (
  opts: CreateHttpLogOpts,
): ICreateHttpLogDto => {
  const {
    context,
    request,
    message: responseMessage,
    status,
    statusCode: responseStatusCode,
    data,
  } = opts;

  const authorization = request.headers['authorization'] ?? '';
  const requestAuthMethod = authorization.split(' ')[0];
  const requestBody = request.body
    ? filterSensitiveRequestBody(request.body)
    : undefined;
  const requestIp = request.ip;
  const requestMethod = request.method;
  const requestParams = request.query;
  const requestPath = request.originalUrl || request.url;
  const requestUser = request.user
    ? filterSensitiveUser(request.user)
    : undefined;
  const requestUserAgent = request.headers['user-agent'];

  const responseStatus = status;
  const responseTimestamp = new Date();
  const responseResult = data ? filterSensitiveResult(data) : undefined;

  const message = `${responseMessage} ${requestMethod} ${requestPath} ${responseStatusCode}`;

  return {
    context,
    message,
    requestAuthMethod,
    requestBody,
    requestIp,
    requestMethod,
    requestParams,
    requestPath,
    requestUser,
    requestUserAgent,
    responseMessage,
    responseStatus,
    responseStatusCode,
    responseTimestamp,
    responseResult,
  };
};
