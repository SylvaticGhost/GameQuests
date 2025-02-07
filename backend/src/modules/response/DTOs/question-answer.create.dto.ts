import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class QuestionAnswerCreateDto {
    @IsUUID()
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        description: 'Response id',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    responseId: string;

    @IsPositive()
    @ApiProperty({
        type: 'number',
        description: 'Question number',
        example: 1,
    })
    question: number;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        description: 'answer on text question',
        example: 'Paris',
    })
    text_answer?: string;

    @IsOptional()
    @ApiProperty({
        type: 'number',
        description: 'answer test question',
        example: [1, 4],
    })
    test_answer?: number[];

    @IsOptional()
    @ApiProperty({
        type: 'number',
        description: 'answer image question',
        example: [
            [1, 2],
            [3, 4],
        ],
    })
    image_box_answer?: number[][];
}
