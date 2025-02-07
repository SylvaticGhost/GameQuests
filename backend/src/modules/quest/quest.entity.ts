import { BadRequestException } from '@nestjs/common';
import { QuestCreateDto } from './DTOs/quest.create.dto';
import { QuestDocument } from './schemas/quest.schema';
import { Task, TaskWithoutAnswer } from './task.entity';
import { v4 as uuidv4 } from 'uuid';

export interface QuestInfo {
    id: string;
    name: string;
    description?: string;
    time?: string;
    realTime: boolean;
    startDate?: Date;
    endDate?: Date;
}

export interface QuestWithoutAnswers extends QuestInfo {
    tasks: TaskWithoutAnswer[];
}

export class Quest implements QuestInfo {
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

        const numbers = new Set(tasks.map((task) => task.number));
        if (numbers.size !== tasks.length) {
            throw new BadRequestException('Task numbers must be unique');
        }

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

    static fromDocumnt(document: QuestDocument) {
        return new Quest(
            document.id,
            document.name,
            document.ownerId,
            document.tasks,
            document.realTime,
            document.startDate,
            document.endDate,
            document.description,
            document.time,
        );
    }

    withoutAnswers(): QuestWithoutAnswers {
        const filteredTasks = this.tasks.map((task) => {
            task.input.answer = null;
            return task;
        });
        const copy = this.copy();
        copy.tasks = filteredTasks;
        return copy;
    }

    copy(): Quest {
        return new Quest(
            this.id,
            this.name,
            this.ownerId,
            this.tasks,
            this.realTime,
            this.startDate,
            this.endDate,
            this.description,
            this.time,
        );
    }

    getInfo(): QuestInfo {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            time: this.time,
            realTime: this.realTime,
            startDate: this.startDate,
            endDate: this.endDate,
        } as QuestInfo;
    }
}
