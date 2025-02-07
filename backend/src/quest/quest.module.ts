import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { UserModule } from 'src/user/user.module';
import { QuestDocument, QuestSchema } from './schemas/quest.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestRepository } from './quest.repository';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([
            { name: QuestDocument.name, schema: QuestSchema },
        ]),
    ],
    controllers: [QuestController],
    providers: [QuestService, QuestRepository],
})
export class QuestModule {}
