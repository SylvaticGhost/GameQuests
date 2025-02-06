import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class TaskTextInputDef {
    @Prop({ required: true })
    answer: string;
}

@Schema()
export class TestVariantDef {
    @Prop({ required: true })
    number: number;

    @Prop()
    text?: string;

    @Prop()
    image?: string;
}

@Schema()
export class TaskTestDef {
    @Prop({ required: true })
    variants: TestVariantDef[];

    @Prop({ required: true })
    answer: number[];
}
