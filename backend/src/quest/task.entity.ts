import { TaskCreateDto } from './DTOs/task.create.dto';
import {
    TaskTextInput,
    TaskTest as TaskTestInput,
    TaskImageBoxInput,
} from './task-input.entity';

export class Task {
    text: string;
    image?: string;
    video?: string;
    input: TaskTextInput | TaskTestInput | TaskImageBoxInput;

    constructor(
        text: string,
        input: TaskTextInput | TaskTestInput | TaskImageBoxInput,
        image?: string,
        video?: string,
    ) {
        this.text = text;
        this.input = input;
        this.image = image;
        this.video = video;
    }

    static create(dto: TaskCreateDto) {
        const input: TaskTextInput | TaskTestInput | TaskImageBoxInput =
            dto.input_image_box ?? dto.input_test ?? dto.input_text;

        if (!input) {
            throw new Error('No input provided');
        }

        return new Task(dto.text, input, dto.image, dto.video);
    }

    get type(): 'text' | 'test' | 'image_box' {
        if (this.input instanceof TaskTextInput) {
            return 'text';
        } else if (this.input instanceof TaskTestInput) {
            return 'test';
        } else {
            return 'image_box';
        }
    }
}
