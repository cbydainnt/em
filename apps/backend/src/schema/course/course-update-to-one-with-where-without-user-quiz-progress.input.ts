import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutUser_quiz_progressInput } from './course-update-without-user-quiz-progress.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutUser_quiz_progressInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_quiz_progressInput)
    data!: CourseUpdateWithoutUser_quiz_progressInput;
}
