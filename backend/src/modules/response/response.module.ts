import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { UserModule } from 'src/modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseEnd, ResponseEndSchema } from './entities/response-end.entity';
import { Response, ResponseSchema } from './entities/response.entity';
import { QuestionAnswer, QuestionAnswerSchema } from './entities/question-answer.entity';
import { ResponseRepository } from './repositories/response.repository';
import { ResponseEndRepository } from './repositories/response-end.repository';
import { QuestionAnswerRepository } from './repositories/question-answer.repository';
import { QuestModule } from 'src/modules/quest/quest.module';

@Module({
    imports: [
        UserModule,
        QuestModule,
        MongooseModule.forFeature([
            { name: Response.name, schema: ResponseSchema },
            { name: QuestionAnswer.name, schema: QuestionAnswerSchema },
            { name: ResponseEnd.name, schema: ResponseEndSchema },
        ]),
    ],
    controllers: [ResponseController],
    providers: [
        ResponseService,
        ResponseRepository,
        ResponseEndRepository,
        QuestionAnswerRepository,
    ],
    exports: [ResponseService],
})
export class ResponseModule {}
