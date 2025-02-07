import { Injectable } from '@nestjs/common';
import { ReadCreateRepository } from 'src/shared/read-create-repository';
import {
    QuestionAnswer,
    QuestionAnswerDocument,
} from '../entities/question-answer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionAnswerRepository extends ReadCreateRepository<QuestionAnswer> {
    constructor(
        @InjectModel(QuestionAnswer.name) model: Model<QuestionAnswerDocument>,
    ) {
        super(model);
    }

    async findByResponseId(responseId: string): Promise<QuestionAnswer[]> {
        return this.find({ responseId });
    }

    async findByResponseIdAndQuestion(responseId: string, question: number) {
        return this.model.findOne({ responseId, question });
    }

    async exists(responseId: string, question: number) {
        const result = await this.model.exists({ responseId, question });
        return !!result;
    }
}
