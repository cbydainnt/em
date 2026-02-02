import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CourseReviewCountAggregate } from './course-review-count-aggregate.output';
import { CourseReviewAvgAggregate } from './course-review-avg-aggregate.output';
import { CourseReviewSumAggregate } from './course-review-sum-aggregate.output';
import { CourseReviewMinAggregate } from './course-review-min-aggregate.output';
import { CourseReviewMaxAggregate } from './course-review-max-aggregate.output';

@ObjectType()
export class AggregateCourseReview {

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
