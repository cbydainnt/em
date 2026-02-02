import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CourseReviewCountAggregate } from './course-review-count-aggregate.output';
import { CourseReviewAvgAggregate } from './course-review-avg-aggregate.output';
import { CourseReviewSumAggregate } from './course-review-sum-aggregate.output';
import { CourseReviewMinAggregate } from './course-review-min-aggregate.output';
import { CourseReviewMaxAggregate } from './course-review-max-aggregate.output';

@ObjectType()
export class CourseReviewGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => Int, {nullable:false})
    rating!: number;

    @Field(() => String, {nullable:true})
    comment?: string;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:false})
    updated_at!: Date | string;

    @Field(() => CourseReviewCountAggregate, {nullable:true})
    _count?: CourseReviewCountAggregate;

    @Field(() => CourseReviewAvgAggregate, {nullable:true})
    _avg?: CourseReviewAvgAggregate;

    @Field(() => CourseReviewSumAggregate, {nullable:true})
    _sum?: CourseReviewSumAggregate;

    @Field(() => CourseReviewMinAggregate, {nullable:true})
    _min?: CourseReviewMinAggregate;

    @Field(() => CourseReviewMaxAggregate, {nullable:true})
    _max?: CourseReviewMaxAggregate;
}
