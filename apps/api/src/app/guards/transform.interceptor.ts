import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse } from '@libs/app-interfaces/api';

@Injectable()
export class TransformInterceptor implements NestInterceptor<ApiResponse> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse> {
    return next.handle().pipe(map(
      data => (
        {
          success: true,
          data: data
        }
    )));
  }
}
