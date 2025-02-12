import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TaskTextInputDocument extends Document {
    @Prop({ required: true })
    answer: string;

    @Prop({ required: false })
    caseSensitive: boolean;
}

export const TaskTextInputSchema = SchemaFactory.createForClass(TaskTextInputDocument);

@Schema()
export class TestVariantDocument extends Document {
    @Prop({ required: true })
    number: number;

    @Prop()
    text?: string;

    @Prop()
    image?: string;
}

export const TestVariantSchema = SchemaFactory.createForClass(TestVariantDocument);

@Schema()
export class TaskTestDocument extends Document {
    @Prop({ required: true, type: [TestVariantSchema] })
    variants: TestVariantDocument[];

    @Prop({ required: true })
    answer: number[];
}

export const TaskTestSchema = SchemaFactory.createForClass(TaskTestDocument);

@Schema()
export class TaskImageBoxDocument extends Document {
    @Prop({ required: true })
    xBoxes: number;

    @Prop({ required: true })
    yBoxes: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, type: [TestVariantSchema] })
    answer: TestVariantDocument[];
}

export const TaskImageBoxSchema = SchemaFactory.createForClass(TaskImageBoxDocument);
