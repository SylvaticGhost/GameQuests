import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export abstract class searchDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    size?: number = 10;
}
