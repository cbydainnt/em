import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutUser_lesson_progressInput } from './course-update-without-user-lesson-progress.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutUser_lesson_progressInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_lesson_progressInput)
    data!: CourseUpdateWithoutUser_lesson_progressInput;
}
