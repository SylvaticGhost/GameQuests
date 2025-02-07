import { Controller, Put, Query } from '@nestjs/common';
import { UserId } from 'src/middlewares/decorators/userid.decorator';

@Controller('response')
export class ResponseController {
    @Put('start')
    async startQuest(
        @UserId() userId: string,
        @Query('questId') questId: string,
    ) {}
}
