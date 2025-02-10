import { Comment } from './comment';
import { Rating } from './rating.entity';

export class QuestRating {
    questId: string;
    averageRating: number;
    comments: Comment[];

    constructor(questId: string, avarageRating: number, comments: Comment[]) {
        this.questId = questId;
        this.averageRating = avarageRating;
        this.comments = comments;
    }

    static from(ratings: Rating[]) {
        const questId = ratings[0].questId;
        const averageRating =
            ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
        const comments = ratings.map((rating) => {
            return {
                comment: rating.comment,
                rating: rating.rating,
            };
        });
        return new QuestRating(questId, averageRating, comments);
    }
}
