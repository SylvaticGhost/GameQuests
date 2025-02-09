import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RatingCreateDto } from './rating.create.dto';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    questId: string;

    @Prop()
    comment: string;

    @Prop({ required: true })
    rating: number;

    constructor(userId: string, questId: string, rating: number, comment: string) {
        this.userId = userId;
        this.questId = questId;
        this.rating = rating;
        this.comment = comment;
    }

    static create(dto: RatingCreateDto, userId: string): Rating {
        return new Rating(userId, dto.questId, dto.rating, dto.comment);
    }
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
