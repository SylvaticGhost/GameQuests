import { Injectable } from '@nestjs/common';
import { ResponseService } from '../response/response.service';
import { QuestService } from '../quest/quest.service';
import { NotificationGateway } from './notification.gateway';
import { Server } from 'socket.io';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TimeLimitService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly questService: QuestService,
        private readonly notificationGateway: NotificationGateway,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {}

    async set(responseId: string) {
        const response = await this.responseService.getResponse(responseId);

        if (this.schedulerRegistry.doesExist('timeout', `timeLimit-${responseId}`)) return;

        const quest = await this.questService.get(response.questId);
        const delay = response.startTime.getTime() + quest.timeInSecond * 1000 - Date.now();

        if (delay <= 0) {
            (this.notificationGateway.server as unknown as Server)
                .to(`response-${responseId}`)
                .emit('timeLimit', 0);
            return;
        }

        const timeout = setTimeout(() => {
            (this.notificationGateway.server as unknown as Server)
                .to(`response-${responseId}`)
                .emit('timeLimit', 0);
        }, delay);

        this.schedulerRegistry.addTimeout(`timeLimit-${responseId}`, timeout);
    }
}
