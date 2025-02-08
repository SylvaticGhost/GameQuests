import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReadCreateRepository } from 'src/shared/read-create-repository';
import { ResponseEnd, ResponseEndDocument } from '../entities/response-end.entity';

@Injectable()
export class ResponseEndRepository extends ReadCreateRepository<ResponseEnd> {
    constructor(
        @InjectModel(Response.name)
        model: Model<ResponseEndDocument>,
    ) {
        super(model);
    }
}
