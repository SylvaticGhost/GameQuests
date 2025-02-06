import {
    CanActivate,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly userService: UserService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        const reqUser = request.user;

        if (!reqUser || !reqUser.userId) throw new UnauthorizedException();

        const user = await this.userService.getUser(reqUser.userId);

        if (!user) throw new InternalServerErrorException('User not found');

        return true;
    }
}
