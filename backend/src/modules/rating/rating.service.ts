import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating, RatingDocument } from './rating.entity';
import { Model } from 'mongoose';
import { RatingCreateDto } from './rating.create.dto';
import { QuestRating } from './quest-rating';

@Injectable()
export class RatingService {
    constructor(@InjectModel('Rating') private readonly model: Model<RatingDocument>) {}

    async create(dto: RatingCreateDto, userId: string) {
        const rating = new this.model(Rating.create(dto, userId));
        return rating.save();
    }

    async getQuestRating(questId: string) {
        const ratings = await this.model.find({ questId });
        return QuestRating.from(ratings);
    }
}
