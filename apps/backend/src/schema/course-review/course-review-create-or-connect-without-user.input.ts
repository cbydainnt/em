import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseReviewWhereUniqueInput } from './course-review-where-unique.input';
import { Type } from 'class-transformer';
import { CourseReviewCreateWithoutUserInput } from './course-review-create-without-user.input';

@InputType()
export class CourseReviewCreateOrConnectWithoutUserInput {

    @Field(() => CourseReviewWhereUniqueInput, {nullable:false})
    @Type(() => CourseReviewWhereUniqueInput)
    where!: Prisma.AtLeast<CourseReviewWhereUniqueInput, 'id' | 'course_id_user_id'>;

    @Field(() => CourseReviewCreateWithoutUserInput, {nullable:false})
    @Type(() => CourseReviewCreateWithoutUserInput)
    create!: CourseReviewCreateWithoutUserInput;
}
