import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskCreateDto } from './task.create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QuestCreateDto {
    @IsString()
    @ApiProperty({
        description: 'Name of quest',
        example: 'name',
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Description of quest',
        example: 'description',
    })
    description?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'duration of quest in format HH:MM:SS',
        example: '01:00:00',
    })
    time?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: 'is quest real time or not', example: 'true' })
    realTime: boolean;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @ApiProperty({
        description: 'start date of quest with timezone',
        example: '2021-01-01T00:00:00Z',
    })
    startDate?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @ApiProperty({
        description: 'end date of quest with timezone',
        example: '2021-01-01T00:00:00Z',
    })
    endDate?: Date;

    @IsNotEmpty()
    @ApiProperty({
        description: 'tasks of quest',
        type: [TaskCreateDto],
    })
    tasks: TaskCreateDto[];
}
