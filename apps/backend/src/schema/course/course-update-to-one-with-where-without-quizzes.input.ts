import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutQuizzesInput } from './course-update-without-quizzes.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutQuizzesInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutQuizzesInput, {nullable:false})
    @Type(() => CourseUpdateWithoutQuizzesInput)
    data!: CourseUpdateWithoutQuizzesInput;
}
