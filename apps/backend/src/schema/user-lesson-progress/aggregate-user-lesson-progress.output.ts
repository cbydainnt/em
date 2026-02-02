import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserLessonProgressCountAggregate } from './user-lesson-progress-count-aggregate.output';
import { UserLessonProgressAvgAggregate } from './user-lesson-progress-avg-aggregate.output';
import { UserLessonProgressSumAggregate } from './user-lesson-progress-sum-aggregate.output';
import { UserLessonProgressMinAggregate } from './user-lesson-progress-min-aggregate.output';
import { UserLessonProgressMaxAggregate } from './user-lesson-progress-max-aggregate.output';

@ObjectType()
export class AggregateUserLessonProgress {

    @Field(() => UserLessonProgressCountAggregate, {nullable:true})
    _count?: UserLessonProgressCountAggregate;

    @Field(() => UserLessonProgressAvgAggregate, {nullable:true})
    _avg?: UserLessonProgressAvgAggregate;

    @Field(() => UserLessonProgressSumAggregate, {nullable:true})
    _sum?: UserLessonProgressSumAggregate;

    @Field(() => UserLessonProgressMinAggregate, {nullable:true})
    _min?: UserLessonProgressMinAggregate;

    @Field(() => UserLessonProgressMaxAggregate, {nullable:true})
    _max?: UserLessonProgressMaxAggregate;
}
