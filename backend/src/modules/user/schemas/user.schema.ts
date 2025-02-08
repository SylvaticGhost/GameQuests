import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserDef & Document;

@Schema()
export class UserDef {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    nickname: string;

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDef);
