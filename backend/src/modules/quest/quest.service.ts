import { ForbiddenException, Injectable } from '@nestjs/common';
import { Quest } from './quest.entity';
import { QuestCreateDto } from './DTOs/quest.create.dto';
import { QuestRepository } from './quest.repository';

@Injectable()
export class QuestService {
    constructor(private readonly questRepository: QuestRepository) {}

    async create(dto: QuestCreateDto, creatorId: string) {
        const quest = Quest.create(dto, creatorId);
        this.questRepository.save(quest);
        return quest;
    }

    async get(id: string) {
        return this.questRepository.get(id);
    }

    async getWithPermissionCheck(id: string, mode: 'owner' | 'default', userId: string) {
        const quest = await this.get(id);

        if (mode === 'owner' && quest.ownerId !== userId) {
            throw new ForbiddenException('You are not the owner of this quest');
        }

        return quest;
    }

    async delete(id: string, userId: string) {
        const quest = await this.getWithPermissionCheck(id, 'owner', userId);
        await this.questRepository.delete(quest.id);
    }

    async exists(id: string) {
        return this.questRepository.exists(id);
    }
}
