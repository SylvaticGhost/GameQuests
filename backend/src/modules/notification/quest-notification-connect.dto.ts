import { IsBoolean, IsUUID } from 'class-validator';

export class QuestNotificationConnect {
    @IsUUID()
    responseId: string;

    @IsUUID()
    questId: string;

    @IsBoolean()
    realTime: boolean;
}
