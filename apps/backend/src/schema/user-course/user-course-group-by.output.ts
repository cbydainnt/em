import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserCourseCountAggregate } from './user-course-count-aggregate.output';
import { UserCourseAvgAggregate } from './user-course-avg-aggregate.output';
import { UserCourseSumAggregate } from './user-course-sum-aggregate.output';
import { UserCourseMinAggregate } from './user-course-min-aggregate.output';
import { UserCourseMaxAggregate } from './user-course-max-aggregate.output';

@ObjectType()
export class UserCourseGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:true})
    enrolled_at?: Date | string;

    @Field(() => Date, {nullable:true})
    last_accessed?: Date | string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Date, {nullable:true})
    expired_date?: Date | string;

    @Field(() => Date, {nullable:true})
    paused_at?: Date | string;

    @Field(() => Date, {nullable:true})
    pause_until?: Date | string;

    @Field(() => Int, {nullable:false})
    total_paused_days!: number;

    @Field(() => Int, {nullable:false})
    pause_count!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => UserCourseCountAggregate, {nullable:true})
    _count?: UserCourseCountAggregate;

    @Field(() => UserCourseAvgAggregate, {nullable:true})
    _avg?: UserCourseAvgAggregate;

    @Field(() => UserCourseSumAggregate, {nullable:true})
    _sum?: UserCourseSumAggregate;

    @Field(() => UserCourseMinAggregate, {nullable:true})
    _min?: UserCourseMinAggregate;

    @Field(() => UserCourseMaxAggregate, {nullable:true})
    _max?: UserCourseMaxAggregate;
}
