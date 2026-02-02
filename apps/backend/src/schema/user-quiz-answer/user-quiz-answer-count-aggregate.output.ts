import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserQuizAnswerCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    progress_id!: number;

    @Field(() => Int, {nullable:false})
    question_id!: number;

    @Field(() => Int, {nullable:false})
    selected_answer_ids!: number;

    @Field(() => Int, {nullable:false})
    answer_text!: number;

    @Field(() => Int, {nullable:false})
    is_correct!: number;

    @Field(() => Int, {nullable:false})
    points_earned!: number;

    @Field(() => Int, {nullable:false})
    time_spent!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
