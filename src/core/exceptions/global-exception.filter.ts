import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const i18n = I18nContext.current(host)!;
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'error.internalServerError';
    let error: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      error = exception.getResponse();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const result = {
      error,
      statusCode: status,
      message: i18n.t(message),
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(result);
  }
}
