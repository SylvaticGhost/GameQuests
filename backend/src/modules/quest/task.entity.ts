import { BadRequestException } from '@nestjs/common';
import { TaskCreateDto } from './DTOs/task.create.dto';
import {
    TaskImageBoxDocument,
    TaskTestDocument,
    TaskTextInputDocument,
} from './schemas/task-input.schema';
import { TaskDocument } from './schemas/task.schema';
import {
    TaskTextInput,
    TaskImageBox,
    TaskTest,
    TaskTextInputWithoutAnswer,
    TaskTestWithoutAnswer,
    TaskImageBoxWithoutAnswer,
    ImageBox,
} from './task-input.entity';

export interface TaskWithoutAnswer {
    text: string;
    image?: string;
    video?: string;
    input:
        | TaskTextInputWithoutAnswer
        | TaskTestWithoutAnswer
        | TaskImageBoxWithoutAnswer;
}

export class Task {
    number: number;
    text: string;
    image?: string;
    video?: string;
    input: TaskTextInput | TaskTest | TaskImageBox;

    constructor(
        number: number,
        text: string,
        input: TaskTextInput | TaskTest | TaskImageBox,
        image?: string,
        video?: string,
    ) {
        this.number = number;
        this.text = text;
        this.input = input;
        this.image = image;
        this.video = video;
    }

    static create(dto: TaskCreateDto) {
        const input: TaskTextInput | TaskTest | TaskImageBox =
            dto.input_image_box ?? dto.input_test ?? dto.input_text;

        if (!input) {
            throw new Error('No input provided');
        }

        return new Task(dto.number, dto.text, input, dto.image, dto.video);
    }

    static fromDocument(document: TaskDocument) {
        let input: TaskTextInput | TaskTest | TaskImageBox;

        if (document.input instanceof TaskTextInputDocument) {
            input = document.input as unknown as TaskTextInput;
        } else if (document.input instanceof TaskTestDocument) {
            input = document.input as TaskTest;
        } else if (document.input instanceof TaskImageBoxDocument) {
            input = document.input as unknown as TaskImageBox;
        }

        return new Task(
            document.number,
            document.text,
            input,
            document.image,
            document.video,
        );
    }

    get type(): 'text' | 'test' | 'image_box' {
        if (this.input instanceof TaskTextInput) {
            return 'text';
        } else if (this.input instanceof TaskTest) {
            return 'test';
        } else {
            return 'image_box';
        }
    }

    withoutAnswers(): TaskWithoutAnswer {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { answer, ...rest } = this.input;
        return {
            ...this,
            input: rest,
        } as TaskWithoutAnswer;
    }

    check(answer: string | number[] | number[][]) {
        if (this.input instanceof TaskTextInput)
            return this.checkTextInput(answer as string);

        if (this.input instanceof TaskTest)
            return this.checkTest(answer as number[]);

        if (this.input instanceof TaskImageBox)
            return this.checkImageBox(answer as number[][]);

        throw new BadRequestException('Invalid input type');
    }

    private checkTextInput(answer: string) {
        if (!(this.input instanceof TaskTextInput))
            throw new BadRequestException('Invalid input type');

        const input = this.input as TaskTextInput;
        const answers = input.answer;

        if (input.caseSensitive) {
            return answers.includes(answer);
        } else {
            answer = answer.toLowerCase();
            return answers.some((a) => a.toLowerCase() === answer);
        }
    }

    private checkTest(answer: number[]) {
        if (!(this.input instanceof TaskTest))
            throw new BadRequestException('Invalid input type');

        const input = this.input as TaskTest;
        const answers = input.answer;

        return (
            answers.length === answer.length &&
            answers.every((a) => answer.includes(a))
        );
    }

    private checkImageBox(answer: number[][]) {
        if (!(this.input instanceof TaskImageBox))
            throw new BadRequestException('Invalid input type');

        const input = this.input as TaskImageBox;
        const userAnswer: ImageBox[] = answer.map(
            (a) => new ImageBox(a[0], a[1]),
        );
        const answers = input.answer;

        return (
            answers.length === answer.length &&
            answers.every((a) =>
                userAnswer.some((ua) => ua.x === a.x && ua.y === a.y),
            )
        );
    }
}
