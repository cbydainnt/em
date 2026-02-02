import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AnswerMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    answer_id?: true;

    @Field(() => Boolean, {nullable:true})
    question_id?: true;

    @Field(() => Boolean, {nullable:true})
    answer_text?: true;

    @Field(() => Boolean, {nullable:true})
    answer_image?: true;

    @Field(() => Boolean, {nullable:true})
    is_correct?: true;

    @Field(() => Boolean, {nullable:true})
    order?: true;

    @Field(() => Boolean, {nullable:true})
    match_key?: true;

    @Field(() => Boolean, {nullable:true})
    blank_position?: true;
}
