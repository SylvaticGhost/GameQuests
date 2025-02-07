import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ResponseCreateDto {
    @IsUUID()
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        description: 'The id of the quest',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    questId: string;

    @IsString()
    @ApiProperty({
        type: 'string',
        description: 'The nickname of the user',
        example: 'John',
    })
    nickname: string;
}
