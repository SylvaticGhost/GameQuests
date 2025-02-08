import { Module } from '@nestjs/common';
import { QuestModule } from '../quest/quest.module';
import { UserModule } from '../user/user.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports: [ResponseModule, UserModule, QuestModule],
})
export class NotificationModule {}
