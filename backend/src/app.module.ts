import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { QuestModule } from './modules/quest/quest.module';
import { ResponseModule } from './modules/response/response.module';
import { RatingModule } from './modules/rating/rating.module';
import { NotificationModule } from './modules/notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
        RatingModule,
        NotificationModule,
        EventEmitterModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

function getMongoURI(configService: ConfigService) {
    const uri = configService.get<string>('MONGODB_URI') || process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined');
    }
    return uri;
}
