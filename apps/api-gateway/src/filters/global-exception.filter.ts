import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponse } from '@libs/interfaces/response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const error = exception.getError?.() || exception;

    const errorResponse: ApiErrorResponse = {
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Check if it's an RPC exception
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error
    ) {
      // Handle validation errors
      if (error.code === 3) {
        const details = JSON.parse(error.details);
        return response.status(HttpStatus.BAD_REQUEST).json({
          ...errorResponse,
          // message: 'Validation failed',
          // errors: details,
          ...details,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
      }

      // Handle other RPC errors
      const status = this.getHttpStatus(error.code);
      try {
        const details = JSON.parse(error.details);
        return response.status(status).json({
          ...errorResponse,
          ...details,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
      } catch {
        return response.status(status).json({
          ...errorResponse,
          message: error.details,
          stack:
            process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
      }
    }

    // Handle HTTP exceptions

    return response
      .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        ...errorResponse,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
  }

  private getHttpStatus(code: number): number {
    switch (code) {
      case 3: // Validation error
        return HttpStatus.BAD_REQUEST;
      case 5: // Not found
        return HttpStatus.NOT_FOUND;
      case 7: // Permission denied
        return HttpStatus.FORBIDDEN;
      case 16: // Unauthenticated
        return HttpStatus.UNAUTHORIZED;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
