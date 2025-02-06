import { Prop } from '@nestjs/mongoose';
import { Task } from '../task.entity';
import { TaskDef } from './task.schema';

export class QuestSchema {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop()
    time?: string;

    @Prop({ required: true })
    @Prop({ required: true })
    realTime: boolean;

    @Prop()
    startDate?: Date;

    @Prop()
    endDate?: Date;

    @Prop({ required: true, type: TaskDef })
    tasks: Task[];
}
