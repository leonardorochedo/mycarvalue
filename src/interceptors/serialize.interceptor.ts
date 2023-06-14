import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {} // Based on DTO instanced

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run before a request is handled
        // by the request handler

        return handler.handle().pipe(
            map((data: any) => {
                // Run before the response is sent out
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            })
        )
    }
}