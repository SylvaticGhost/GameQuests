import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ResponseDocument = Response & Document;

@Schema()
export class Response {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    questId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    nickname: string;

    @Prop({ required: true })
    startTime: Date;

    constructor(
        id: string,
        questId: string,
        userId: string,
        nickname: string,
        startTime: Date,
    ) {
        this.id = id;
        this.questId = questId;
        this.userId = userId;
        this.nickname = nickname;
        this.startTime = startTime;
    }

    static create(questId: string, userId: string, nickname: string) {
        return new Response(uuidv4(), questId, userId, nickname, new Date());
    }

    static fromObject(obj: any) {
        return new Response(
            obj.id,
            obj.questId,
            obj.userId,
            obj.nickname,
            obj.startTime,
        );
    }
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
