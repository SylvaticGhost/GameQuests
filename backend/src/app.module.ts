import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { QuestModule } from './quest/quest.module';
import { ResponseModule } from './response/response.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: getMongoURI(configService),
            }),
            inject: [ConfigService],
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        QuestModule,
        ResponseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

function getMongoURI(configService: ConfigService) {
    const uri =
        configService.get<string>('MONGODB_URI') || process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined');
    }
    return uri;
}
