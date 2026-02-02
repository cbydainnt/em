import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_quiz_progressInput } from './course-create-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_quiz_progressInput } from './course-create-or-connect-without-user-quiz-progress.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutUser_quiz_progressInput {

    @Field(() => CourseCreateWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_quiz_progressInput)
    create?: CourseCreateWithoutUser_quiz_progressInput;

    @Field(() => CourseCreateOrConnectWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_quiz_progressInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_quiz_progressInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
