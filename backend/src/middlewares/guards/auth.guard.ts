import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserGuard } from '../guards/user.guard';

export function AuthGuard() {
    return applyDecorators(
        UseGuards(UserGuard),
        ApiResponse({ status: 401, description: 'Unauthorized' }),
    );
}
