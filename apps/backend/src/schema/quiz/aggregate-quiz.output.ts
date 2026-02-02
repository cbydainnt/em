import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { QuizCountAggregate } from './quiz-count-aggregate.output';
import { QuizAvgAggregate } from './quiz-avg-aggregate.output';
import { QuizSumAggregate } from './quiz-sum-aggregate.output';
import { QuizMinAggregate } from './quiz-min-aggregate.output';
import { QuizMaxAggregate } from './quiz-max-aggregate.output';

@ObjectType()
export class AggregateQuiz {

    @Field(() => QuizCountAggregate, {nullable:true})
    _count?: QuizCountAggregate;

    @Field(() => QuizAvgAggregate, {nullable:true})
    _avg?: QuizAvgAggregate;

    @Field(() => QuizSumAggregate, {nullable:true})
    _sum?: QuizSumAggregate;

    @Field(() => QuizMinAggregate, {nullable:true})
    _min?: QuizMinAggregate;

    @Field(() => QuizMaxAggregate, {nullable:true})
    _max?: QuizMaxAggregate;
}
