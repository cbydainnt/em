import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutQuizzesInput } from './course-create-without-quizzes.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutQuizzesInput } from './course-create-or-connect-without-quizzes.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutQuizzesInput {

    @Field(() => CourseCreateWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseCreateWithoutQuizzesInput)
    create?: CourseCreateWithoutQuizzesInput;

    @Field(() => CourseCreateOrConnectWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutQuizzesInput)
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
