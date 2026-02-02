import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewWhereInput } from './course-review-where.input';
import { Type } from 'class-transformer';
import { CourseReviewOrderByWithRelationInput } from './course-review-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CourseReviewScalarFieldEnum } from './course-review-scalar-field.enum';

@ArgsType()
export class FindManyCourseReviewArgs {

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

    @Field(() => [CourseReviewScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CourseReviewScalarFieldEnum>;
}
