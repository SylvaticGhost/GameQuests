import { Body, Controller, Post } from '@nestjs/common';
import { QuestCreateDto } from './DTOs/quest.create.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestService } from './quest.service';
import { GetPayload } from 'src/middlewares/decorators/get-payload.decorator';
import { UserPayloadDto } from 'src/user/DTOs/user.payload.dto';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';

@ApiTags('Quest')
@Controller('quest')
export class QuestController {
    constructor(private readonly questService: QuestService) {}

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
}
