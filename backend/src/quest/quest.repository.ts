import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestDocument } from './schemas/quest.schema';
import { Model } from 'mongoose';
import { Quest, QuestInfo } from './quest.entity';

@Injectable()
export class QuestRepository {
    constructor(
        @InjectModel(QuestDocument.name)
        private readonly questModel: Model<QuestDocument>,
    ) {}

    async save(quest: Quest) {
        const model = {
            ...quest,
            tasks: quest.tasks.map((task) => ({ ...task })),
        };
        const createdQuest = new this.questModel(model);
        await createdQuest.save();
    }

    async get(id: string): Promise<Quest | null> {
        return this.find({ id });
    }

    private async find(param): Promise<Quest | null> {
        const foundQuest = await this.questModel.findOne(param);
        if (!foundQuest) return null;
        return Quest.fromDocumnt(foundQuest);
    }

    async getUsersQuests(userId: string): Promise<QuestInfo[]> {
        const quests = await this.questModel
            .find({ ownerId: userId })
            .select('-tasks')
            .exec();

        return quests.map((quest) => ({ ...quest.toObject() })) as QuestInfo[];
    }

    async getQuestInfo(id: string): Promise<QuestInfo | null> {
        const foundQuest = await this.questModel
            .findOne({ id })
            .select('-tasks')
            .exec();
        return foundQuest.toObject() as QuestInfo;
    }

    async getTask(questId: string, number: number) {
        const questWithTask = await this.questModel
            .findOne({ id: questId }, { tasks: { $elemMatch: { number } } })
            .exec();
        return questWithTask?.tasks[0];
    }

    async delete(id: string) {
        await this.questModel.deleteOne({ id });
    }
}
