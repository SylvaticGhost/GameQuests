import { QuestCreateDto } from './DTOs/quest.create.dto';
import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';

export class Quest {
    id: string;
    name: string;
    description?: string;
    ownerId?: string;
    time?: string;
    realTime: boolean;
    startDate?: Date;
    endDate?: Date;
    tasks: Task[];

    constructor(
        id: string,
        name: string,
        ownerId: string,
        tasks: Task[],
        realTime: boolean,
        startDate?: Date,
        endDate?: Date,
        description?: string,
        time?: string,
    ) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.tasks = tasks;
        this.realTime = realTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.time = time;
    }

    static create(dto: QuestCreateDto, ownerId: string) {
        const tasks = dto.tasks.map(Task.create);
        return new Quest(
            uuidv4(),
            dto.name,
            ownerId,
            tasks,
            dto.realTime,
            dto.startDate ?? new Date(),
            dto.endDate,
            dto.description,
            dto.time,
        );
    }
}

export interface QuestInfo {
    id: string;
    name: string;
    description?: string;
    time?: string;
    realTime: boolean;
    startDate?: Date;
    endDate?: Date;
}
