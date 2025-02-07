import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from '../task.entity';
import { TaskSchema } from './task.schema';
import { Document } from 'mongoose';

@Schema()
export class QuestDocument extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    ownerId: string;

    @Prop()
    time?: string;

    @Prop({ required: true })
    realTime: boolean;

    @Prop()
    startDate?: Date;

    @Prop()
    endDate?: Date;

    @Prop({ required: true, type: [TaskSchema] })
    tasks: Task[];
}

export const QuestSchema = SchemaFactory.createForClass(QuestDocument);
