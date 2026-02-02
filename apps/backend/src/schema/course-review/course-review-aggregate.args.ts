import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewWhereInput } from './course-review-where.input';
import { Type } from 'class-transformer';
import { CourseReviewOrderByWithRelationInput } from './course-review-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CourseReviewCountAggregateInput } from './course-review-count-aggregate.input';
import { CourseReviewAvgAggregateInput } from './course-review-avg-aggregate.input';
import { CourseReviewSumAggregateInput } from './course-review-sum-aggregate.input';
import { CourseReviewMinAggregateInput } from './course-review-min-aggregate.input';
import { CourseReviewMaxAggregateInput } from './course-review-max-aggregate.input';

@ArgsType()
export class CourseReviewAggregateArgs {

    @Field(() => CourseReviewWhereInput, {nullable:true})
    @Type(() => CourseReviewWhereInput)
    where?: CourseReviewWhereInput;

    @Field(() => [CourseReviewOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CourseReviewOrderByWithRelationInput>;

    @Field(() => CourseReviewWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

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
