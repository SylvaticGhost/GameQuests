import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserCreateDto } from './DTOs/user.create.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './DTOs/user.login.dto';
import { UserDto } from './DTOs/user.dto';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';
import { GetPayload as UserPayload } from 'src/middlewares/decorators/get-payload.decorator';
import { GoogleGuard } from 'src/middlewares/guards/google.guard';
import { UserPayloadDto } from './DTOs/user.payload.dto';

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

    @AuthGuard()
    @Put('set-avatar')
    @ApiOperation({ summary: 'Upload avatar' })
    @ApiResponse({ status: 200, description: 'Avatar uploaded' })
    async setAvatar(@UserPayload() user: UserPayloadDto, @Query('url') url: string) {
        return await this.userService.setAvatar(user.id, url);
    }

    @Get('google')
    @UseGuards(GoogleGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async auth() {}

    @Get('/google/callback')
    @UseGuards(GoogleGuard)
    async googleAuthCallback(@Req() req, @Res() res: Response) {
        const token = await this.userService.loginWithGoogle(req.user);

        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: true,
            secure: false,
        });

        res.redirect('http://localhost:3000');
    }
}
