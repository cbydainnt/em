import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_quiz_progressInput } from './course-create-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_quiz_progressInput } from './course-create-or-connect-without-user-quiz-progress.input';
import { CourseUpsertWithoutUser_quiz_progressInput } from './course-upsert-without-user-quiz-progress.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutUser_quiz_progressInput } from './course-update-to-one-with-where-without-user-quiz-progress.input';

@InputType()
export class CourseUpdateOneWithoutUser_quiz_progressNestedInput {

    @Field(() => CourseCreateWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_quiz_progressInput)
    create?: CourseCreateWithoutUser_quiz_progressInput;

    @Field(() => CourseCreateOrConnectWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_quiz_progressInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_quiz_progressInput;

    @Field(() => CourseUpsertWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseUpsertWithoutUser_quiz_progressInput)
    upsert?: CourseUpsertWithoutUser_quiz_progressInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutUser_quiz_progressInput)
    update?: CourseUpdateToOneWithWhereWithoutUser_quiz_progressInput;
}
