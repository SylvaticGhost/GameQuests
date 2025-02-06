import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HashedPassword } from './DTOs/hashed-password';

export type UserAuthDocument = UserAuth & Document;

@Schema()
export class UserAuth {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    password_hash: string;

    @Prop({ required: true })
    password_salt: string;

    constructor(id: string, password_hash: string, password_salt: string) {
        this.id = id;
        this.password_hash = password_hash;
        this.password_salt = password_salt;
    }

    get hashedPassword(): HashedPassword {
        return { hash: this.password_hash, salt: this.password_salt };
    }
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
