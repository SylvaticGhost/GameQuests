import { Injectable } from '@nestjs/common';
import { Quest } from './quest.entity';
import { QuestCreateDto } from './DTOs/quest.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestDocument } from './schemas/quest.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestService {
    constructor(
        @InjectModel(QuestDocument.name)
        private readonly questModel: Model<QuestDocument>,
    ) {}

    async create(dto: QuestCreateDto, creatorId: string) {
        const quest = Quest.create(dto, creatorId);
        const model = {
            ...quest,
            tasks: quest.tasks.map((task) => ({ ...task })),
        };
        console.info(model);
        const createdQuest = new this.questModel(model);
        await createdQuest.save();
        return quest;
    }
}
