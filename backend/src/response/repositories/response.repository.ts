import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response, ResponseDocument } from '../entities/response.entity';
import { Model } from 'mongoose';
import { ReadCreateRepository } from 'src/shared/read-create-repository';

@Injectable()
export class ResponseRepository extends ReadCreateRepository<Response> {
    constructor(
        @InjectModel(Response.name)
        model: Model<ResponseDocument>,
    ) {
        super(model);
    }
}
