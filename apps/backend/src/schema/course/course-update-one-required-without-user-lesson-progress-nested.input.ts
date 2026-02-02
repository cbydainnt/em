import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutUser_lesson_progressInput } from './course-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutUser_lesson_progressInput } from './course-create-or-connect-without-user-lesson-progress.input';
import { CourseUpsertWithoutUser_lesson_progressInput } from './course-upsert-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutUser_lesson_progressInput } from './course-update-to-one-with-where-without-user-lesson-progress.input';

@InputType()
export class CourseUpdateOneRequiredWithoutUser_lesson_progressNestedInput {

    @Field(() => CourseCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseCreateWithoutUser_lesson_progressInput)
    create?: CourseCreateWithoutUser_lesson_progressInput;

    @Field(() => CourseCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: CourseCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => CourseUpsertWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseUpsertWithoutUser_lesson_progressInput)
    upsert?: CourseUpsertWithoutUser_lesson_progressInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutUser_lesson_progressInput)
    update?: CourseUpdateToOneWithWhereWithoutUser_lesson_progressInput;
}
