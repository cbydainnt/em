import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { UserLessonProgressCountAggregate } from './user-lesson-progress-count-aggregate.output';
import { UserLessonProgressAvgAggregate } from './user-lesson-progress-avg-aggregate.output';
import { UserLessonProgressSumAggregate } from './user-lesson-progress-sum-aggregate.output';
import { UserLessonProgressMinAggregate } from './user-lesson-progress-min-aggregate.output';
import { UserLessonProgressMaxAggregate } from './user-lesson-progress-max-aggregate.output';

@ObjectType()
export class UserLessonProgressGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => Int, {nullable:false})
    watched_seconds!: number;

    @Field(() => Int, {nullable:false})
    completed!: number;

    @Field(() => Date, {nullable:true})
    last_accessed?: Date | string;

    @Field(() => GraphQLJSON, {nullable:true})
    segments?: any;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

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
