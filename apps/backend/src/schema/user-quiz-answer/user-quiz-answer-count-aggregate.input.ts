import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserQuizAnswerCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    progress_id?: true;

    @Field(() => Boolean, {nullable:true})
    question_id?: true;

    @Field(() => Boolean, {nullable:true})
    selected_answer_ids?: true;

    @Field(() => Boolean, {nullable:true})
    answer_text?: true;

    @Field(() => Boolean, {nullable:true})
    is_correct?: true;

    @Field(() => Boolean, {nullable:true})
    points_earned?: true;

    @Field(() => Boolean, {nullable:true})
    time_spent?: true;

    @Field(() => Boolean, {nullable:true})
    created_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
