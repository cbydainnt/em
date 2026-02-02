import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { AnswerCountAggregate } from './answer-count-aggregate.output';
import { AnswerAvgAggregate } from './answer-avg-aggregate.output';
import { AnswerSumAggregate } from './answer-sum-aggregate.output';
import { AnswerMinAggregate } from './answer-min-aggregate.output';
import { AnswerMaxAggregate } from './answer-max-aggregate.output';

@ObjectType()
export class AnswerGroupBy {

    @Field(() => String, {nullable:false})
    answer_id!: string;

    @Field(() => String, {nullable:false})
    question_id!: string;

    @Field(() => String, {nullable:false})
    answer_text!: string;

    @Field(() => String, {nullable:true})
    answer_image?: string;

    @Field(() => Boolean, {nullable:false})
    is_correct!: boolean;

    @Field(() => Int, {nullable:false})
    order!: number;

    @Field(() => String, {nullable:true})
    match_key?: string;

    @Field(() => Int, {nullable:true})
    blank_position?: number;

    @Field(() => AnswerCountAggregate, {nullable:true})
    _count?: AnswerCountAggregate;

    @Field(() => AnswerAvgAggregate, {nullable:true})
    _avg?: AnswerAvgAggregate;

    @Field(() => AnswerSumAggregate, {nullable:true})
    _sum?: AnswerSumAggregate;

    @Field(() => AnswerMinAggregate, {nullable:true})
    _min?: AnswerMinAggregate;

    @Field(() => AnswerMaxAggregate, {nullable:true})
    _max?: AnswerMaxAggregate;
}
