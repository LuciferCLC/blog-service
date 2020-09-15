/**
 * 响应时间拦截器
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BlogLogger } from '@/module/common/logger/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: BlogLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { fieldName } = ctx.getInfo();
    const now = Date.now();

    return next.handle().pipe(
      tap(
        () => {
          this.logger.log(`${fieldName} SUCCESS ---- ${Date.now() - now}ms`);
        },
        () => {
          this.logger.error(`${fieldName} ERROR ---- ${Date.now() - now}ms`);
        }
      )
    );
  }
}
