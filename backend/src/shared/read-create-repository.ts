import { Model } from 'mongoose';

export abstract class ReadCreateRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    async create(entity: T): Promise<T> {
        await this.model.create(entity);
        return entity;
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findOne({ id });
    }

    protected async find(query: any): Promise<T[]> {
        return this.model.find(query);
    }
}
