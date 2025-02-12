import { IsOptional, IsUUID } from 'class-validator';
import { searchDto } from 'src/shared/search.dto';

export class QuestSearchDto extends searchDto {
    @IsOptional()
    @IsUUID()
    creatorId?: string;
}
