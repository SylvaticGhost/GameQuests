import { Injectable } from '@nestjs/common';
import { TimeLimitService } from './time-limit.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationListener {
    constructor(private readonly timeLimitService: TimeLimitService) {}

    @OnEvent('timeLimit.set')
    async handleTimeLimitSet(payload: { responseId: string }) {
        await this.timeLimitService.set(payload.responseId);
    }
}
