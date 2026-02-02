import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { QuestionCountAggregate } from './question-count-aggregate.output';
import { QuestionAvgAggregate } from './question-avg-aggregate.output';
import { QuestionSumAggregate } from './question-sum-aggregate.output';
import { QuestionMinAggregate } from './question-min-aggregate.output';
import { QuestionMaxAggregate } from './question-max-aggregate.output';

@ObjectType()
export class AggregateQuestion {

    @Field(() => QuestionCountAggregate, {nullable:true})
    _count?: QuestionCountAggregate;

    @Field(() => QuestionAvgAggregate, {nullable:true})
    _avg?: QuestionAvgAggregate;

    @Field(() => QuestionSumAggregate, {nullable:true})
    _sum?: QuestionSumAggregate;

    @Field(() => QuestionMinAggregate, {nullable:true})
    _min?: QuestionMinAggregate;

    @Field(() => QuestionMaxAggregate, {nullable:true})
    _max?: QuestionMaxAggregate;
}
