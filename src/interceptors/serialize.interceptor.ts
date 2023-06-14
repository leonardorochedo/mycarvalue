import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// DTO
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run before a request is handled
        // by the request handler

        return handler.handle().pipe(
            map((data: any) => {
                // Run before the response is sent out
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true,
                });
            })
        )
    }
}