import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutUser_quiz_progressInput } from './course-update-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutUser_quiz_progressInput } from './course-create-without-user-quiz-progress.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutUser_quiz_progressInput {

    @Field(() => CourseUpdateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => CourseUpdateWithoutUser_quiz_progressInput)
    update!: CourseUpdateWithoutUser_quiz_progressInput;

    @Field(() => CourseCreateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => CourseCreateWithoutUser_quiz_progressInput)
    create!: CourseCreateWithoutUser_quiz_progressInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
