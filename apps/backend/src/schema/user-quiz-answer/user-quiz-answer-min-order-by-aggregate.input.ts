import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserQuizAnswerMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    progress_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    question_id?: keyof typeof SortOrder;

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
}
