import { TaskWithoutAnswer } from 'src/quest/task.entity';
import { Progress } from '../progress';

export class QuestionCurrentDto {
    progress: Progress;
    next: TaskWithoutAnswer;
}
