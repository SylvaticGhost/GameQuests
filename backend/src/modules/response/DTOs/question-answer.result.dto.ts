import { ApiProperty } from '@nestjs/swagger';

export class QuestionAnswerResultDto {
    @ApiProperty({
        description: 'id of response',
        example: '60f3b3b3b3b3b3b3b3b3b3b3',
    })
    responseId: string;

    @ApiProperty({
        description: 'number of task',
        example: 1,
    })
    taskNumber: number;

    @ApiProperty({
        description: 'is answer correct',
        example: true,
    })
    correct: boolean;

    constructor(responseId: string, taskNumber: number, correct: boolean) {
        this.responseId = responseId;
        this.taskNumber = taskNumber;
        this.correct = correct;
    }
}
