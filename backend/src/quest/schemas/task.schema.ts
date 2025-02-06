import { Prop, Schema } from '@nestjs/mongoose';
import { TaskTestDef, TaskTextInputDef } from './task-input.schema';

@Schema()
export class TaskDef {
    @Prop({ required: true })
    text: string;

    @Prop()
    image?: string;

    @Prop()
    type: string;

    @Prop({ required: true })
    input: TaskTextInputDef | TaskTestDef;
}
