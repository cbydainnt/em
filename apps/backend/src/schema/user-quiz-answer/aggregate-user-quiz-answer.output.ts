import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserQuizAnswerCountAggregate } from './user-quiz-answer-count-aggregate.output';
import { UserQuizAnswerAvgAggregate } from './user-quiz-answer-avg-aggregate.output';
import { UserQuizAnswerSumAggregate } from './user-quiz-answer-sum-aggregate.output';
import { UserQuizAnswerMinAggregate } from './user-quiz-answer-min-aggregate.output';
import { UserQuizAnswerMaxAggregate } from './user-quiz-answer-max-aggregate.output';

@ObjectType()
export class AggregateUserQuizAnswer {

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
