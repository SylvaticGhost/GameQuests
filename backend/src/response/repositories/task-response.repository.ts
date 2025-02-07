import { Injectable } from '@nestjs/common';
import { ReadCreateRepository } from 'src/shared/read-create-repository';
import {
    TaskResponse,
    TaskResponseDocument,
} from '../entities/task-response.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskResponseRepository extends ReadCreateRepository<TaskResponse> {
    constructor(
        @InjectModel(TaskResponse.name) model: Model<TaskResponseDocument>,
    ) {
        super(model);
    }
}
