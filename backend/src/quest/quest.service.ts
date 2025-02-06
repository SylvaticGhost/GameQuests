import { Injectable } from '@nestjs/common';
import { Quest } from './quest.entity';
import { QuestCreateDto } from './DTOs/quest.create.dto';

@Injectable()
export class QuestService {
    constructor() {}

    async create(dto: QuestCreateDto, creatorId: string) {
        return Quest.create(dto, creatorId);
    }
}
