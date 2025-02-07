import { Model } from 'mongoose';

export class Repository<T> {
    constructor(private readonly model: Model<T>) {}
}
