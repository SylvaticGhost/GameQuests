import { Injectable } from '@nestjs/common';
import { QuestService } from 'src/quest/quest.service';

@Injectable()
export class ResponseService {
    constructor(private readonly questService: QuestService) {}

    async startQuest(userId: string, questId: string) {}
}
