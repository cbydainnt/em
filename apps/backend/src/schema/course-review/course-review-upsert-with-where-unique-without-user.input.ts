import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewUpdateWithoutUserInput } from './course-review-update-without-user.input';
import { CourseReviewCreateWithoutUserInput } from './course-review-create-without-user.input';

@InputType()
export class CourseReviewUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewUpdateWithoutUserInput, {nullable:false})
    @Type(() => CourseReviewUpdateWithoutUserInput)
    update!: CourseReviewUpdateWithoutUserInput;

    @Field(() => CourseReviewCreateWithoutUserInput, {nullable:false})
    @Type(() => CourseReviewCreateWithoutUserInput)
    create!: CourseReviewCreateWithoutUserInput;
}
