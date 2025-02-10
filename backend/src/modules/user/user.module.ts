import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthSchema } from './auth-user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './auth-strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '3h' },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: 'UserDef', schema: UserSchema },
            { name: 'UserAuth', schema: UserAuthSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserRepository, UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule {}
