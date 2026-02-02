import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewWhereInput } from './course-review-where.input';
import { Type } from 'class-transformer';
import { CourseReviewOrderByWithAggregationInput } from './course-review-order-by-with-aggregation.input';
import { CourseReviewScalarFieldEnum } from './course-review-scalar-field.enum';
import { CourseReviewScalarWhereWithAggregatesInput } from './course-review-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CourseReviewCountAggregateInput } from './course-review-count-aggregate.input';
import { CourseReviewAvgAggregateInput } from './course-review-avg-aggregate.input';
import { CourseReviewSumAggregateInput } from './course-review-sum-aggregate.input';
import { CourseReviewMinAggregateInput } from './course-review-min-aggregate.input';
import { CourseReviewMaxAggregateInput } from './course-review-max-aggregate.input';

@ArgsType()
export class CourseReviewGroupByArgs {

    @Field(() => CourseReviewWhereInput, {nullable:true})
    @Type(() => CourseReviewWhereInput)
    where?: CourseReviewWhereInput;

    @Field(() => [CourseReviewOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CourseReviewOrderByWithAggregationInput>;

    @Field(() => [CourseReviewScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CourseReviewScalarFieldEnum>;

    @Field(() => CourseReviewScalarWhereWithAggregatesInput, {nullable:true})
    having?: CourseReviewScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CourseReviewCountAggregateInput, {nullable:true})
    _count?: CourseReviewCountAggregateInput;

    @Field(() => CourseReviewAvgAggregateInput, {nullable:true})
    _avg?: CourseReviewAvgAggregateInput;

    @Field(() => CourseReviewSumAggregateInput, {nullable:true})
    _sum?: CourseReviewSumAggregateInput;

    @Field(() => CourseReviewMinAggregateInput, {nullable:true})
    _min?: CourseReviewMinAggregateInput;

    @Field(() => CourseReviewMaxAggregateInput, {nullable:true})
    _max?: CourseReviewMaxAggregateInput;
}
