import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class AnswerCountAggregate {

    @Field(() => Int, {nullable:false})
    answer_id!: number;

    @Field(() => Int, {nullable:false})
    question_id!: number;

    @Field(() => Int, {nullable:false})
    answer_text!: number;

    @Field(() => Int, {nullable:false})
    answer_image!: number;

    @Field(() => Int, {nullable:false})
    is_correct!: number;

    @Field(() => Int, {nullable:false})
    order!: number;

    @Field(() => Int, {nullable:false})
    match_key!: number;

    @Field(() => Int, {nullable:false})
    blank_position!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
