import { TaskWithoutAnswer } from 'src/modules/quest/task.entity';
import { Progress } from '../progress';

export class QuestionCurrentDto {
    progress: Progress;
    next: TaskWithoutAnswer;
}
