import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Response } from './response.entity';

export type ResponseEndDocument = ResponseEnd & Document;

@Schema()
export class ResponseEnd {
    @Prop({ required: true })
    responseId: string;

    @Prop({ required: true })
    endTime: Date;

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    total: number;

    constructor(
        responseId: string,
        endTime: Date,
        score: number,
        total: number,
    ) {
        this.responseId = responseId;
        this.endTime = endTime;
        this.score = score;
        this.total = total;
    }

    static forResponse(response: Response, score: number, total: number) {
        return new ResponseEnd(response.id, new Date(), score, total);
    }

    static fromObject(obj: any) {
        return new ResponseEnd(
            obj.responseId,
            obj.endTime,
            obj.score,
            obj.total,
        );
    }
}

export const ResponseEndSchema = SchemaFactory.createForClass(ResponseEnd);
