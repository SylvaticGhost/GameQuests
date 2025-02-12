import { BadRequestException, Body, Controller, Get, Put } from '@nestjs/common';
import { UserId } from 'src/middlewares/decorators/userid.decorator';
import { ResponseCreateDto } from './DTOs/response.create.dto';
import { ResponseService } from './response.service';
import { QuestionAnswerCreateDto } from './DTOs/question-answer.create.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from './entities/response.entity';
import { QuestionAnswerResultDto } from './DTOs/question-answer.result.dto';
import { QuestionCurrentDto } from './DTOs/question.current.dto';
import { ResponseEnd } from './entities/response-end.entity';
import { ResponseSearchDto } from './DTOs/response.search.dto';

@Controller('response')
export class ResponseController {
    constructor(private readonly responseService: ResponseService) {}

    @ApiResponse({ status: 200, description: 'Start quest', type: Response })
    @Put('start')
    async startQuest(@UserId() userId: string, @Body() dto: ResponseCreateDto) {
        return this.responseService.createResponse(dto, userId);
    }

    @Put('answer')
    @ApiResponse({ status: 200, description: 'Answer question', type: QuestionAnswerResultDto })
    async answerQuestion(@UserId() userId: string, @Body() dto: QuestionAnswerCreateDto) {
        return this.responseService.answer(dto, userId);
    }

    @Get('question')
    @ApiResponse({ status: 200, description: 'Get question', type: QuestionCurrentDto })
    async getQuestion(responseId: string, questId: string) {
        return this.responseService.getQuestion(responseId, questId);
    }

    @Put('finish')
    @ApiResponse({ status: 200, description: 'Finish quest', type: ResponseEnd })
    async finishQuest(@UserId() userId: string, responseId: string) {
        return this.responseService.finish(responseId, userId);
    }

    @Put('search')
    @ApiOperation({ summary: 'Search responses for user on test' })
    async search(@UserId() userId: string, @Body() searchDto: ResponseSearchDto) {
        if (!searchDto.userId) searchDto.userId = userId;
        if (!searchDto.userId)
            throw new BadRequestException('userId is required or authentication');
        return this.responseService.searchResponses(searchDto);
    }
}
