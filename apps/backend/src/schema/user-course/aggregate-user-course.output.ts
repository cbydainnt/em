import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserCourseCountAggregate } from './user-course-count-aggregate.output';
import { UserCourseAvgAggregate } from './user-course-avg-aggregate.output';
import { UserCourseSumAggregate } from './user-course-sum-aggregate.output';
import { UserCourseMinAggregate } from './user-course-min-aggregate.output';
import { UserCourseMaxAggregate } from './user-course-max-aggregate.output';

@ObjectType()
export class AggregateUserCourse {

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
