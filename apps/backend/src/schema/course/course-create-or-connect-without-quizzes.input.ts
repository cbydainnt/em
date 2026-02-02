import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutQuizzesInput } from './course-create-without-quizzes.input';

@InputType()
export class CourseCreateOrConnectWithoutQuizzesInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutQuizzesInput, {nullable:false})
    @Type(() => CourseCreateWithoutQuizzesInput)
    create!: CourseCreateWithoutQuizzesInput;
}
