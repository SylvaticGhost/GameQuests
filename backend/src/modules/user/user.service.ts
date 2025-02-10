import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from './DTOs/user.create.dto';
import { UserLoginDto } from './DTOs/user.login.dto';
import { Result } from 'src/shared/result';
import { PasswordHelper } from './password.helper';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadDto } from './DTOs/user.payload.dto';
import { User } from './user.entity';
import { UserDto } from './DTOs/user.dto';
import { GetAuth, UserRepository } from './user.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async create(creatDto: UserCreateDto) {
        if (await this.userExists(creatDto.email)) return Result.badRequest('User already exists');

        const user = User.create(creatDto);
        return user.asDto;
    }

    async login(loginDto: UserLoginDto): Promise<Result<string>> {
        const user = await this.userRepository.findByEmail(loginDto.email, GetAuth.Include);

        if (!user) return Result.badRequest('invalid sign in credentials');

        const passwordMatch: boolean = await PasswordHelper.comparePasswords(
            loginDto.password,
            user.hashedPassword,
        );

        if (!passwordMatch) return Result.badRequest('invalid sign in credentials');

        const jwt = this.generateJwtToken(user.payload);

        return Result.success(jwt);
    }

    async loginWithGoogle(user) {
        const existedUser = await this.userRepository.findByEmail(user.email, GetAuth.NotInclude);

        if (!existedUser) {
            await this.registerWithGoogle(user);
            return this.loginWithGoogle(user);
        }

        const jwt = this.generateJwtToken(existedUser.payload);
        return jwt;
    }

    private async registerWithGoogle(user: any) {
        const createdUser = User.createWithGoogle(user);
        await this.userRepository.save(createdUser);
    }

    async userExists(email: string): Promise<boolean> {
        return this.userRepository.userExistsByEmail(email);
    }

    async getUser(userId: string): Promise<UserDto | null> {
        const fromCache = await this.cacheManager.get<UserDto>(userId);

        if (fromCache) return fromCache;

        const user = await this.userRepository.findById(userId, GetAuth.NotInclude);

        if (!user) return null;

        await this.cacheManager.set(userId, user.asDto, 60);

        return user.asDto;
    }

    private generateJwtToken(userPayload: UserPayloadDto) {
        return this.jwtService.sign(userPayload);
    }
}
