import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            tap((result) => {
                if (!result) return;

                const response = context.switchToHttp().getResponse();
                if (result.code) {
                    response.status(result.code);
                }

                if (
                    result.hasOwnProperty('isSuccessful') &&
                    !result.isSuccessful &&
                    result.hasOwnProperty('statusCode')
                ) {
                    throw new BadRequestException(
                        result.message || 'Operation failed',
                        result.statusCode,
                    );
                }
            }),
        );
    }
}
