import { UserCreateDto } from './DTOs/user.create.dto';
import { UserDto } from './DTOs/user.dto';
import { PasswordHelper } from './password.helper';
import { v4 as uuidv4 } from 'uuid';
import { HashedPassword } from './DTOs/hashed-password';
import { UserPayloadDto } from './DTOs/user.payload.dto';
import { UserAuth } from './auth-user.entity';
import { UserDef } from './schemas/user.schema';

export class User {
    id: string;

    email: string;

    nickname: string;

    created_at: Date;

    birthday: Date;

    private password?: HashedPassword;

    constructor(id: string, email: string, username: string, created_at: Date, birthday: Date) {
        this.id = id;
        this.email = email;
        this.nickname = username;
        this.created_at = created_at;
        this.birthday = birthday;
    }

    public static create(dto: UserCreateDto) {
        const password = PasswordHelper.hashPassword(dto.password);

        const id = uuidv4();
        const birthday = new Date(dto.birthday);

        const user = new User(id, dto.email, dto.nickname, new Date(), birthday);
        user.attachPassword(password);

        return user;
    }

    public static fromMongo(userDef: UserDef) {
        return new User(
            userDef.id,
            userDef.email,
            userDef.nickname,
            userDef.created_at,
            userDef.birthday,
        );
    }

    get asDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            nickname: this.nickname,
            birthdate: this.birthday,
            createdAt: this.created_at,
        };
    }

    attachAuth(auth: UserAuth) {
        if (auth.id !== this.id) throw new Error('User id does not match');

        const password: HashedPassword = {
            hash: auth.password_hash,
            salt: auth.password_salt,
        };
        this.attachPassword(password);
    }

    private attachPassword(password: HashedPassword) {
        this.password = password;
    }

    get hashedPassword(): HashedPassword {
        if (!this.password)
            throw new Error('password not attached or not supported in this context');
        return this.password;
    }

    get auth(): UserAuth {
        const passport = this.hashedPassword;
        return new UserAuth(this.id, passport.hash, passport.salt);
    }

    get payload(): UserPayloadDto {
        return {
            id: this.id,
            email: this.email,
            nickname: this.nickname,
        };
    }
}
