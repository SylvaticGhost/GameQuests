import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseEnd, ResponseEndSchema } from './entities/response-end.entity';
import { Response, ResponseSchema } from './entities/response.entity';
import {
    TaskResponse,
    TaskResponseSchema,
} from './entities/task-response.entity';
import { ResponseRepository } from './repositories/response.repository';
import { ResponseEndRepository } from './repositories/response-end.repository';
import { TaskResponseRepository } from './repositories/task-response.repository';
import { QuestModule } from 'src/quest/quest.module';

@Module({
    imports: [
        UserModule,
        QuestModule,
        MongooseModule.forFeature([
            { name: Response.name, schema: ResponseSchema },
            { name: TaskResponse.name, schema: TaskResponseSchema },
            { name: ResponseEnd.name, schema: ResponseEndSchema },
        ]),
    ],
    controllers: [ResponseController],
    providers: [
        ResponseService,
        ResponseRepository,
        ResponseEndRepository,
        TaskResponseRepository,
    ],
})
export class ResponseModule {}
