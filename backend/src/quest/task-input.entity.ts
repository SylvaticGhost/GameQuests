import { ApiProperty } from '@nestjs/swagger';

export class TaskTextInput implements TaskTextInputWithoutAnswer {
    @ApiProperty({ description: 'answer to task', example: 'Paris' })
    answer: string[];
    @ApiProperty({ description: 'is case sensitive', example: true })
    caseSensitive: boolean;
}

export class TestVariant {
    @ApiProperty({ description: 'number of variant', example: 1 })
    number: number;

    @ApiProperty({ description: 'text of variant', example: 'Paris' })
    text?: string;

    @ApiProperty({
        description: 'url of image of variant',
        example: '*/task1-1',
    })
    image?: string;
}

export class TaskTest implements TaskTestWithoutAnswer {
    variants: TestVariant[];

    @ApiProperty({
        description: 'correct answers as number of variant',
        example: [1, 2],
    })
    answer: number[];
}

export class TaskImageBox implements TaskImageBoxWithoutAnswer {
    @ApiProperty({ description: 'number of boxes in x axis', example: 10 })
    xBoxes: number;
    @ApiProperty({ description: 'number of boxes in y axis', example: 10 })
    yBoxes: number;
    answer: ImageBox[];
}

export class ImageBox {
    @ApiProperty({ description: 'x coordinate of box', example: 10 })
    x: number;

    @ApiProperty({ description: 'y coordinate of box', example: 10 })
    y: number;
}

export interface TaskTextInputWithoutAnswer {
    caseSensitive: boolean;
}

export interface TaskTestWithoutAnswer {
    variants: TestVariant[];
}

export interface TaskImageBoxWithoutAnswer {
    xBoxes: number;
    yBoxes: number;
}
