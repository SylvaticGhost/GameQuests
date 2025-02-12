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
import { ResponseEnd } from './entities/response-end.entity';
import { ResponseSearchDto } from './DTOs/response.search.dto';

@Injectable()
export class ResponseService {
    constructor(
        private readonly questService: QuestService,
        private readonly responseRepository: ResponseRepository,
        private readonly responseEndRepository: ResponseEndRepository,
        private readonly questionAnswerRepository: QuestionAnswerRepository,
    ) {}

    async getResponse(responseId: string, userId?: string) {
        const response = await this.responseRepository.findById(responseId);

        if (!response) throw new NotFoundException('Response not found');

        if (userId && response.userId !== userId)
            throw new ForbiddenException('Response does not belong to you');

        return response;
    }

    async createResponse(dto: ResponseCreateDto, userId: string) {
        const quest = await this.questService.get(dto.questId);
        quest.checkDeadline();

        if (userId && (await this.hasOpenedResponse(userId, dto.questId)))
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

    async getQuestion(responseId: string, questId: string) {
        const response = await this.getResponse(responseId);
        const quest = await this.questService.get(questId);

        const answers = await this.questionAnswerRepository.findByResponseId(response.id);

        const progress = Progress.for(quest, answers);

        if (progress.completed === quest.tasks.length) return { progress } as QuestionCurrentDto;

        const number = answers.length > 0 ? progress.last + 1 : 1;
        const next = quest.tasks.find((t) => t.number == number).withoutAnswers();

        return { progress, next } as QuestionCurrentDto;
    }

    async answer(dto: QuestionAnswerCreateDto, userId?: string) {
        const response = await this.getResponse(dto.responseId, userId);

        const quest = await this.questService.get(response.questId);

        if (!quest) throw new NotFoundException('Quest not found');

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

    async finish(responseId: string, userId?: string) {
        const response = await this.getResponse(responseId, userId);

        const quest = await this.questService.get(response.questId);
        quest.checkDeadline();
        quest.checkTimeLimit(response);

        const answers = await this.questionAnswerRepository.findByResponseId(responseId);

        if (quest.tasks.length !== answers.length)
            throw new ConflictException('All questions must be answered');

        const score = answers.filter((a) => a.correct).length;

        const responseEnd = ResponseEnd.forResponse(response, score, answers.length);

        await this.responseEndRepository.create(responseEnd);

        return responseEnd;
    }

    async searchResponses(searchDto: ResponseSearchDto): Promise<ResponseEnd[]> {
        return this.responseEndRepository.search(searchDto);
    }
}
