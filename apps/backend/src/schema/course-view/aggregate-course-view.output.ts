import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CourseViewCountAggregate } from './course-view-count-aggregate.output';
import { CourseViewMinAggregate } from './course-view-min-aggregate.output';
import { CourseViewMaxAggregate } from './course-view-max-aggregate.output';

@ObjectType()
export class AggregateCourseView {

    @Field(() => CourseViewCountAggregate, {nullable:true})
    _count?: CourseViewCountAggregate;

    @Field(() => CourseViewMinAggregate, {nullable:true})
    _min?: CourseViewMinAggregate;

    @Field(() => CourseViewMaxAggregate, {nullable:true})
    _max?: CourseViewMaxAggregate;
}
