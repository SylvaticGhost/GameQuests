import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayloadDto } from 'src/user/DTOs/user.payload.dto';

export const GetPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserPayloadDto => {
        const request = ctx.switchToHttp().getRequest();

        return {
            id: request.user.userId,
            email: request.user.email,
            nickname: request.user.nickname || request.user.username,
        };
    },
);
