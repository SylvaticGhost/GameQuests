import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import { QuestCreateDto } from './DTOs/quest.create.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestService } from './quest.service';
import { GetPayload } from 'src/middlewares/decorators/get-payload.decorator';
import { UserPayloadDto } from 'src/user/DTOs/user.payload.dto';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';
import { Quest, QuestWithoutAnswers } from './quest.entity';
import { QuestRepository } from './quest.repository';

@ApiTags('Quest')
@Controller('quest')
export class QuestController {
    constructor(
        private readonly questService: QuestService,
        private readonly questRepository: QuestRepository,
    ) {}

    @AuthGuard()
    @Post()
    @ApiOperation({ summary: 'Create quest' })
    @ApiBody({ type: QuestCreateDto })
    @ApiResponse({
        status: 201,
        description: 'Quest created',
        type: QuestCreateDto,
    })
    async createQuest(
        @Body() body: QuestCreateDto,
        @GetPayload() user: UserPayloadDto,
    ) {
        return await this.questService.create(body, user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get quest' })
    @ApiResponse({
        status: 200,
        description: 'Quest found',
        type: Quest,
    })
    async getQuest(@Query('id') id: string) {
        if (!id) {
            throw new BadRequestException('Id is required');
        }
        const quest = await this.questService.get(id);
        const result: QuestWithoutAnswers = quest.withoutAnswers();
        console.info(result);
        return result;
    }

    @Get('info')
    @ApiOperation({ summary: 'Get quest info' })
    @ApiResponse({
        status: 200,
        description: 'Quest found',
        type: Quest,
    })
    async getQuestInfo(@Query('id') id: string) {
        if (!id) {
            throw new BadRequestException('Id is required');
        }
        return await this.questRepository.getQuestInfo(id);
    }

    @AuthGuard()
    @Get('permission')
    @ApiResponse({
        status: 200,
        description: 'Quest found',
        type: Quest,
    })
    async getQuestWithPermission(
        @Query('id') id: string,
        @Query('mode') mode: 'owner' | 'default',
        @GetPayload() user: UserPayloadDto,
    ) {
        if (!id) {
            throw new BadRequestException('Id is required');
        }
        return await this.questService.getWithPermissionCheck(
            id,
            mode,
            user.id,
        );
    }

    @AuthGuard()
    @Delete()
    @ApiOperation({ summary: 'Delete quest' })
    @ApiResponse({
        status: 204,
        description: 'Quest deleted',
    })
    async deleteQuest(
        @Query('id') id: string,
        @GetPayload() user: UserPayloadDto,
    ) {
        return await this.questService.delete(id, user.id);
    }
}
