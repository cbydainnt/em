import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CourseViewCountAggregate } from './course-view-count-aggregate.output';
import { CourseViewMinAggregate } from './course-view-min-aggregate.output';
import { CourseViewMaxAggregate } from './course-view-max-aggregate.output';

@ObjectType()
export class CourseViewGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    ip_address?: string;

    @Field(() => String, {nullable:true})
    user_agent?: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => CourseViewCountAggregate, {nullable:true})
    _count?: CourseViewCountAggregate;

    @Field(() => CourseViewMinAggregate, {nullable:true})
    _min?: CourseViewMinAggregate;

    @Field(() => CourseViewMaxAggregate, {nullable:true})
    _max?: CourseViewMaxAggregate;
}
