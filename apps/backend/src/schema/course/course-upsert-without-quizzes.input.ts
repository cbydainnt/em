import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutQuizzesInput } from './course-update-without-quizzes.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutQuizzesInput } from './course-create-without-quizzes.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutQuizzesInput {

    @Field(() => CourseUpdateWithoutQuizzesInput, {nullable:false})
    @Type(() => CourseUpdateWithoutQuizzesInput)
    update!: CourseUpdateWithoutQuizzesInput;

    @Field(() => CourseCreateWithoutQuizzesInput, {nullable:false})
    @Type(() => CourseCreateWithoutQuizzesInput)
    create!: CourseCreateWithoutQuizzesInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
