import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CourseCountAggregate } from './course-count-aggregate.output';
import { CourseAvgAggregate } from './course-avg-aggregate.output';
import { CourseSumAggregate } from './course-sum-aggregate.output';
import { CourseMinAggregate } from './course-min-aggregate.output';
import { CourseMaxAggregate } from './course-max-aggregate.output';

@ObjectType()
export class CourseGroupBy {

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    course_name!: string;

    @Field(() => String, {nullable:false})
    course_description!: string;

    @Field(() => Int, {nullable:false})
    course_price!: number;

    @Field(() => Int, {nullable:false})
    course_original_price!: number;

    @Field(() => String, {nullable:false})
    state!: string;

    @Field(() => String, {nullable:true})
    target?: string;

    @Field(() => String, {nullable:true})
    thumbnail?: string;

    @Field(() => Int, {nullable:true})
    access_duration_months?: number;

    @Field(() => Int, {nullable:false})
    access_type!: number;

    @Field(() => Date, {nullable:true})
    access_expire_at?: Date | string;

    @Field(() => Int, {nullable:false})
    view_count!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => CourseCountAggregate, {nullable:true})
    _count?: CourseCountAggregate;

    @Field(() => CourseAvgAggregate, {nullable:true})
    _avg?: CourseAvgAggregate;

    @Field(() => CourseSumAggregate, {nullable:true})
    _sum?: CourseSumAggregate;

    @Field(() => CourseMinAggregate, {nullable:true})
    _min?: CourseMinAggregate;

    @Field(() => CourseMaxAggregate, {nullable:true})
    _max?: CourseMaxAggregate;
}
