import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
// import { GrpcBaseException } from '../exceptions/base.exception';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly serviceName: string;
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  constructor(serviceName?: string) {
    this.serviceName = serviceName || 'unknown-service';
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error = exception.getError() as any;
    const module = error.module || 'unknown';

    this.logger.debug(
      `[${module}] Exception: ${error.message}`,
      // exception.stack,
    );

    // Handle validation errors
    if (error.code === 3) {
      // Validation error code
      const validationErrors = JSON.parse(error.message);
      return throwError(() => ({
        status: 'error',
        code: error.code,
        details: JSON.stringify({
          message: 'Validation failed',
          module: module,
          service: this.serviceName,
          errors: validationErrors,
          timestamp: new Date().toISOString(),
        }),
      }));
    }

    return throwError(() => ({
      status: 'error',
      code: error.code || 13,
      // message: error.message,
      // module: module,
      // timestamp: new Date().toISOString(),
      details: JSON.stringify({
        message: error.message,
        module: module,
        service: this.serviceName,
        timestamp: new Date().toISOString(),
      }),
    }));
  }
}
