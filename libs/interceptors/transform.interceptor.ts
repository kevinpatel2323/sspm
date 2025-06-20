import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';

interface PaginatedData<T> {
  items: T[];
  total: number;
}

@Injectable()
export class TransformInterceptor<T extends object>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();

    // Get pagination parameters from query
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;

    return next.handle().pipe(
      map((data: T | PaginatedData<T>): ApiResponse<T> => {
        // If data has pagination info (for list responses)
        if ('total' in data) {
          return {
            status: 'success',
            metadata: {
              page,
              limit,
              results: data?.items?.length || 0,
              total: data.total,
            },
            data: (data.items as T) || [],
          };
        }

        // Default response
        return {
          status: 'success',
          data: data,
        };
      }),
    );
  }
}
