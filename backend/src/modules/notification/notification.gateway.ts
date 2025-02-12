import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { plainToInstance } from 'class-transformer';
import { Server, Socket } from 'socket.io';
import { QuestNotificationConnect } from './quest-notification-connect.dto';
import { validate } from 'class-validator';
import { ResponseService } from '../response/response.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway({ namespace: 'quest-notification' })
export class NotificationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(
        private readonly responseService: ResponseService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    afterInit(server: Server) {
        console.log('Notification gateway initialized');
    }

    async handleConnection(client: Socket, ...args: any[]) {
        const dto = plainToInstance(QuestNotificationConnect, client.handshake.query);
        const errors = await validate(dto);
        if (errors.length) {
            client.disconnect();
            return;
        }

        if (dto.realTime) client.join(`real-time-${dto.questId}`);
        else client.join(`response-${dto.responseId}`);

        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    async singleConnect(client: Socket, dto: QuestNotificationConnect) {
        client.join(`response-${dto.responseId}`);
    }

    notifyTimeEnded(responseId: string) {
        this.server.to(`response-${responseId}`).emit('timeEnded');
        this.eventEmitter.emit('timeLimit.set', { responseId });
    }

    @WebSocketServer() server: Server;
}
