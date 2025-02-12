import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class QuestSearchDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    size?: number = 10;

    @IsOptional()
    @IsUUID()
    creatorId?: string;
}
