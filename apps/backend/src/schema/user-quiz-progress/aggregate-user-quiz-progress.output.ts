import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserQuizProgressCountAggregate } from './user-quiz-progress-count-aggregate.output';
import { UserQuizProgressAvgAggregate } from './user-quiz-progress-avg-aggregate.output';
import { UserQuizProgressSumAggregate } from './user-quiz-progress-sum-aggregate.output';
import { UserQuizProgressMinAggregate } from './user-quiz-progress-min-aggregate.output';
import { UserQuizProgressMaxAggregate } from './user-quiz-progress-max-aggregate.output';

@ObjectType()
export class AggregateUserQuizProgress {

    @Field(() => UserQuizProgressCountAggregate, {nullable:true})
    _count?: UserQuizProgressCountAggregate;

    @Field(() => UserQuizProgressAvgAggregate, {nullable:true})
    _avg?: UserQuizProgressAvgAggregate;

    @Field(() => UserQuizProgressSumAggregate, {nullable:true})
    _sum?: UserQuizProgressSumAggregate;

    @Field(() => UserQuizProgressMinAggregate, {nullable:true})
    _min?: UserQuizProgressMinAggregate;

    @Field(() => UserQuizProgressMaxAggregate, {nullable:true})
    _max?: UserQuizProgressMaxAggregate;
}
