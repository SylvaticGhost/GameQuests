import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReadCreateRepository } from 'src/shared/read-create-repository';
import { ResponseEnd, ResponseEndDocument } from '../entities/response-end.entity';
import { ResponseSearchDto } from '../DTOs/response.search.dto';

@Injectable()
export class ResponseEndRepository extends ReadCreateRepository<ResponseEnd> {
    constructor(
        @InjectModel(Response.name)
        model: Model<ResponseEndDocument>,
    ) {
        super(model);
    }

    async search(searchDto: ResponseSearchDto): Promise<ResponseEnd[]> {
        const { page = 1, size = 10, userId } = searchDto;
        const skip = (page - 1) * size;
        if (!userId) throw new BadRequestException('userId is required');
        const query = userId ? { userId } : {};

        const responsesPromise = this.model.find(query).skip(skip).limit(size).exec();
        const countPromise = this.model.countDocuments(query);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [responses, total] = await Promise.all([responsesPromise, countPromise]);

        return responses.map((response) => response as ResponseEnd);
    }
}
