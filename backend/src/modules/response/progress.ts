import { Quest } from 'src/modules/quest/quest.entity';
import { QuestionAnswer } from './entities/question-answer.entity';

export class Progress {
    responseId: string;
    questions: number;
    correct: number[];
    incorrect: number[];

    constructor(
        responseId: string,
        total: number,
        correct: number[],
        incorrect: number[],
    ) {
        this.responseId = responseId;
        this.questions = total;
        this.correct = correct;
        this.incorrect = incorrect;
    }

    get completed() {
        return this.correct.length + this.incorrect.length;
    }

    get last() {
        return Math.max(...this.correct, ...this.incorrect);
    }

    static for(quest: Quest, answers: QuestionAnswer[]) {
        const correct = answers
            .filter((answer) => answer.correct)
            .map((answer) => answer.taskNumber);
        const incorrect = answers
            .filter((answer) => !answer.correct)
            .map((answer) => answer.taskNumber);
        return new Progress(quest.id, quest.tasks.length, correct, incorrect);
    }
}
