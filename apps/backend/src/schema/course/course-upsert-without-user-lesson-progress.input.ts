import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutUser_lesson_progressInput } from './course-update-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutUser_lesson_progressInput } from './course-create-without-user-lesson-progress.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutUser_lesson_progressInput {

    @Field(() => CourseUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_lesson_progressInput)
    update!: CourseUpdateWithoutUser_lesson_progressInput;

    @Field(() => CourseCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => CourseCreateWithoutUser_lesson_progressInput)
    create!: CourseCreateWithoutUser_lesson_progressInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
