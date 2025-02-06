import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserCreateDto } from './DTOs/user.create.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './DTOs/user.login.dto';
import { UserDto } from './DTOs/user.dto';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';
import { GetPayload as UserPayload } from 'src/middlewares/decorators/get-payload.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiOperation({ summary: 'Create user' })
    @ApiBody({ type: UserCreateDto })
    @ApiResponse({ status: 201, description: 'User created' })
    @ApiResponse({ status: 400, description: 'invalid fields' })
    async create(@Body() body: UserCreateDto) {
        return await this.userService.create(body);
    }

    @Put('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: UserLoginDto })
    @ApiResponse({ status: 200, description: 'User logged in' })
    @ApiResponse({ status: 400, description: 'invalid credentials' })
    async login(@Body() body: UserLoginDto) {
        return await this.userService.login(body);
    }

    @AuthGuard()
    @Get('me')
    @ApiOperation({ summary: 'Get current user' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async me(@UserPayload() user: UserDto) {
        return user;
    }
}
