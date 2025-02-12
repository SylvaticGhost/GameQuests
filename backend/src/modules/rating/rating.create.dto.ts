import { IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class RatingCreateDto {
    @IsUUID()
    questId: string;

    @IsOptional()
    @IsString()
    comment: string;

    @Min(1)
    @Max(5)
    rating: number;
}
