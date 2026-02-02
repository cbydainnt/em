import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutQuizzesInput } from './course-create-without-quizzes.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutQuizzesInput } from './course-create-or-connect-without-quizzes.input';
import { CourseUpsertWithoutQuizzesInput } from './course-upsert-without-quizzes.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutQuizzesInput } from './course-update-to-one-with-where-without-quizzes.input';

@InputType()
export class CourseUpdateOneWithoutQuizzesNestedInput {

    @Field(() => CourseCreateWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseCreateWithoutQuizzesInput)
    create?: CourseCreateWithoutQuizzesInput;

    @Field(() => CourseCreateOrConnectWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutQuizzesInput)
    connectOrCreate?: CourseCreateOrConnectWithoutQuizzesInput;

    @Field(() => CourseUpsertWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseUpsertWithoutQuizzesInput)
    upsert?: CourseUpsertWithoutQuizzesInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutQuizzesInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutQuizzesInput)
    update?: CourseUpdateToOneWithWhereWithoutQuizzesInput;
}
