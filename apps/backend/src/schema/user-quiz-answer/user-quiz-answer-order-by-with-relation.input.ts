import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserQuizProgressOrderByWithRelationInput } from '../user-quiz-progress/user-quiz-progress-order-by-with-relation.input';
import { QuestionOrderByWithRelationInput } from '../question/question-order-by-with-relation.input';

@InputType()
export class UserQuizAnswerOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    progress_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    selected_answer_ids?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    answer_text?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    is_correct?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    points_earned?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    time_spent?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_at?: keyof typeof SortOrder;

    @Field(() => UserQuizProgressOrderByWithRelationInput, {nullable:true})
    progress?: UserQuizProgressOrderByWithRelationInput;

    @Field(() => QuestionOrderByWithRelationInput, {nullable:true})
    question?: QuestionOrderByWithRelationInput;
}
