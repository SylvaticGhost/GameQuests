import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator';
import { TaskImageBox, TaskTest, TaskTextInput } from '../task-input.entity';

export class TaskCreateDto {
    @IsPositive()
    @ApiProperty({
        description: 'number of task',
        example: 1,
    })
    number: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'text of task',
        example: 'What is the capital of France?',
    })
    text: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'url to image',
        example: '*/task2.jpg',
    })
    image?: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
        description: 'url to video hosted on any platform',
        example: 'https://www.youtube.com/watch?v=2Q3j6d3b2UA',
    })
    video?: string;

    @ApiProperty({
        description: 'answer for task with text input',
    })
    @IsOptional()
    input_text?: TaskTextInput;

    @ApiProperty({
        description: 'answer for task with test input',
    })
    @IsOptional()
    input_test?: TaskTest;

    @ApiProperty({
        description: 'answer for task with image box input',
    })
    @IsOptional()
    input_image_box?: TaskImageBox;
}
