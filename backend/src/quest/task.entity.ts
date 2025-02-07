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
    text: string;
    image?: string;
    video?: string;
    input: TaskTextInput | TaskTest | TaskImageBox;

    constructor(
        text: string,
        input: TaskTextInput | TaskTest | TaskImageBox,
        image?: string,
        video?: string,
    ) {
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

        return new Task(dto.text, input, dto.image, dto.video);
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

        return new Task(document.text, input, document.image, document.video);
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
}
