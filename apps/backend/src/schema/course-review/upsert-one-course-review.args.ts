import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateInput } from './course-review-create.input';
import { CourseReviewUpdateInput } from './course-review-update.input';

@ArgsType()
export class UpsertOneCourseReviewArgs {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewCreateInput, {nullable:false})
    @Type(() => CourseReviewCreateInput)
    create!: CourseReviewCreateInput;

    @Field(() => CourseReviewUpdateInput, {nullable:false})
    @Type(() => CourseReviewUpdateInput)
    update!: CourseReviewUpdateInput;
}
