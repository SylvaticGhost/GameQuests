import { Injectable } from '@nestjs/common';
import { UserAuth, UserAuthDocument } from './auth-user.entity';
import { UserDef, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';

export enum GetAuth {
    Include,
    NotInclude,
}

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserDef.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(UserAuth.name)
        private readonly userAuthModel: Model<UserAuthDocument>,
    ) {}

    async findById(id: string, option: GetAuth = GetAuth.NotInclude): Promise<User | null> {
        return this.find({ id }, option);
    }

    async findByEmail(email: string, option: GetAuth = GetAuth.NotInclude): Promise<User | null> {
        return this.find({ email }, option);
    }

    async userExistsByEmail(email: string): Promise<boolean> {
        return this.userExists({ email });
    }

    async userExistsById(id: string): Promise<boolean> {
        return this.userExists({ id });
    }

    async create(user: User): Promise<User> {
        await this.userModel.create(user);
        await this.userAuthModel.create(user.auth);
        return user;
    }

    private async userExists(param): Promise<boolean> {
        const userExists = await this.userModel.exists(param);
        return userExists !== null;
    }

    private async find(param, option): Promise<User | null> {
        const foundUser = await this.userModel.findOne(param);
        if (!foundUser) return null;
        const user = User.fromMongo(foundUser);
        if (!user) return null;
        if (option === GetAuth.Include) await this.mapAuth(user);
        return user;
    }

    private async mapAuth(user: User): Promise<User> {
        const auth = await this.userAuthModel.findOne({ id: user.id });
        user.attachAuth(auth);
        return user;
    }
}
