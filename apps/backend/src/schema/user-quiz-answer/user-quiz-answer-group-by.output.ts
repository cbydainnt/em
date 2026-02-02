import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserQuizAnswerCountAggregate } from './user-quiz-answer-count-aggregate.output';
import { UserQuizAnswerAvgAggregate } from './user-quiz-answer-avg-aggregate.output';
import { UserQuizAnswerSumAggregate } from './user-quiz-answer-sum-aggregate.output';
import { UserQuizAnswerMinAggregate } from './user-quiz-answer-min-aggregate.output';
import { UserQuizAnswerMaxAggregate } from './user-quiz-answer-max-aggregate.output';

@ObjectType()
export class UserQuizAnswerGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    progress_id!: string;

    @Field(() => String, {nullable:false})
    question_id!: string;

    @Field(() => [String], {nullable:true})
    selected_answer_ids?: Array<string>;

    @Field(() => String, {nullable:true})
    answer_text?: string;

    @Field(() => Boolean, {nullable:false})
    is_correct!: boolean;

    @Field(() => Float, {nullable:false})
    points_earned!: number;

    @Field(() => Int, {nullable:true})
    time_spent?: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => UserQuizAnswerCountAggregate, {nullable:true})
    _count?: UserQuizAnswerCountAggregate;

    @Field(() => UserQuizAnswerAvgAggregate, {nullable:true})
    _avg?: UserQuizAnswerAvgAggregate;

    @Field(() => UserQuizAnswerSumAggregate, {nullable:true})
    _sum?: UserQuizAnswerSumAggregate;

    @Field(() => UserQuizAnswerMinAggregate, {nullable:true})
    _min?: UserQuizAnswerMinAggregate;

    @Field(() => UserQuizAnswerMaxAggregate, {nullable:true})
    _max?: UserQuizAnswerMaxAggregate;
}
