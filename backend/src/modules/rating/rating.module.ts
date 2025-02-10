import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './rating.entity';
import { RatingService } from './rating.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])],
    providers: [RatingService],
})
export class RatingModule {}
