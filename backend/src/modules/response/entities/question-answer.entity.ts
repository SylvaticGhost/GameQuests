import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionAnswerDocument = QuestionAnswer & Document;

@Schema()
export class QuestionAnswer {
    @Prop({ required: true })
    responseId: string;

    @Prop({ required: true })
    taskNumber: number;

    @Prop({ required: true })
    correct: boolean;

    @Prop({ required: true })
    value: string;

    constructor(
        responseId: string,
        taskNumber: number,
        correct: boolean,
        value: string,
    ) {
        this.responseId = responseId;
        this.taskNumber = taskNumber;
        this.correct = correct;
        this.value = value;
    }
}

export const QuestionAnswerSchema =
    SchemaFactory.createForClass(QuestionAnswer);
