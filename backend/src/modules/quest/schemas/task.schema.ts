import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    TaskImageBoxSchema,
    TaskTestSchema,
    TaskTextInputSchema,
} from './task-input.schema';
import { Document } from 'mongoose';
import { TaskTextInput, TaskTest, TaskImageBox } from '../task-input.entity';

@Schema()
export class TaskDocument extends Document {
    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    text: string;

    @Prop()
    image?: string;

    @Prop()
    video?: string;

    @Prop({
        required: true,
        type: TaskTextInputSchema || TaskTestSchema || TaskImageBoxSchema,
    })
    input: TaskTextInput | TaskTest | TaskImageBox;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
