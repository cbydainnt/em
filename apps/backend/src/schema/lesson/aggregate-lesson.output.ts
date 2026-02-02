import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { LessonCountAggregate } from './lesson-count-aggregate.output';
import { LessonAvgAggregate } from './lesson-avg-aggregate.output';
import { LessonSumAggregate } from './lesson-sum-aggregate.output';
import { LessonMinAggregate } from './lesson-min-aggregate.output';
import { LessonMaxAggregate } from './lesson-max-aggregate.output';

@ObjectType()
export class AggregateLesson {

    @Field(() => LessonCountAggregate, {nullable:true})
    _count?: LessonCountAggregate;

    @Field(() => LessonAvgAggregate, {nullable:true})
    _avg?: LessonAvgAggregate;

    @Field(() => LessonSumAggregate, {nullable:true})
    _sum?: LessonSumAggregate;

    @Field(() => LessonMinAggregate, {nullable:true})
    _min?: LessonMinAggregate;

    @Field(() => LessonMaxAggregate, {nullable:true})
    _max?: LessonMaxAggregate;
}
