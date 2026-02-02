import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseReviewUpdateInput } from './course-review-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';

@ArgsType()
export class UpdateOneCourseReviewArgs {

    @Field(() => CourseReviewUpdateInput, {nullable:false})
    @Type(() => CourseReviewUpdateInput)
    data!: CourseReviewUpdateInput;

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;
}
