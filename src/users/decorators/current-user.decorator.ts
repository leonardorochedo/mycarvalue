import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

// First run current-user interceptor, and run this decorator
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();

        return req.currentUser
    }
)