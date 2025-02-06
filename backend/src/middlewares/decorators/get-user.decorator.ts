import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserDto } from 'src/user/DTOs/user.dto';

export function CurrentUserDecorator() {
    //const userService = Inject(UserService);

    return createParamDecorator(
        async (data: unknown, ctx: ExecutionContext): Promise<UserDto> => {
            const request = ctx.switchToHttp().getRequest();
            const userId = request.user?.userId; // Assuming the user ID is stored in request.user.userId
            const userService = request.injector.get(UserService);
            if (!userId) {
                return null;
            }

            const user = await userService.getUser(userId);
            return user;
        },
    )();
}
