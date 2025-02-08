import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { QuestService } from 'src/modules/quest/quest.service';
import { ResponseRepository } from './repositories/response.repository';
import { ResponseEndRepository } from './repositories/response-end.repository';
import { QuestionAnswerRepository } from './repositories/question-answer.repository';
import { Response } from './entities/response.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { ResponseCreateDto } from './DTOs/response.create.dto';
import { Progress } from './progress';
import { QuestionCurrentDto } from './DTOs/question.current.dto';
import { QuestionAnswerCreateDto } from './DTOs/question-answer.create.dto';
import { QuestionAnswerResultDto } from './DTOs/question-answer.result.dto';

@Injectable()
export class ResponseService {
    constructor(
        private readonly questService: QuestService,
        private readonly responseRepository: ResponseRepository,
        private readonly responseEndRepository: ResponseEndRepository,
        private readonly questionAnswerRepository: QuestionAnswerRepository,
    ) {}

    async createResponse(dto: ResponseCreateDto, userId: string) {
        if (!(await this.questService.exists(dto.questId)))
            throw new NotFoundException('Quest not found');

        if (await this.hasOpenedResponse(userId, dto.questId))
            throw new ConflictException('You have already opened response');

        const response = Response.create(dto, userId);
        await this.responseRepository.create(response);
        return response;
    }

    async hasOpenedResponse(userId: string, questId: string) {
        const lastResponse = await this.responseRepository.lastUserResponse(userId, questId);

        if (!lastResponse) return false;

        const responseEnd = await this.responseEndRepository.findById(lastResponse.id);

        return !responseEnd;
    }

    async getQuestion(userId: string, questId: string) {
        const quest = await this.questService.get(questId);

        if (!quest) throw new NotFoundException('Quest not found');

        const response = await this.responseRepository.lastUserResponse(userId, questId);

        if (!response) throw new NotFoundException('Response not found');

        const answers = await this.questionAnswerRepository.findByResponseId(response.id);

        const progress = Progress.for(quest, answers);

        const number = answers.length > 0 ? progress.last + 1 : 1;
        const next = quest.tasks.find((t) => t.number == number).withoutAnswers();

        return { progress, next } as QuestionCurrentDto;
    }

    async answer(dto: QuestionAnswerCreateDto, userId?: string) {
        const response = await this.responseRepository.findById(dto.responseId);

        if (!response) throw new NotFoundException('Response not found');

        const quest = await this.questService.get(response.questId);

        if (!quest) throw new NotFoundException('Quest not found');

        if (userId && response.userId !== userId)
            throw new ForbiddenException('Response does not belong to you');

        if (await this.questionAnswerRepository.exists(response.id, dto.question))
            throw new ConflictException('Question already answered');

        const task = quest.tasks.find((t) => t.number == dto.question);

        const userAnswer = dto.text_answer || dto.test_answer || dto.image_box_answer;
        const correct = task.check(userAnswer);

        const value: string = JSON.stringify(userAnswer);

        const answer = new QuestionAnswer(response.id, dto.question, correct, value);

        await this.questionAnswerRepository.create(answer);

        return new QuestionAnswerResultDto(response.id, dto.question, correct);
    }
}
