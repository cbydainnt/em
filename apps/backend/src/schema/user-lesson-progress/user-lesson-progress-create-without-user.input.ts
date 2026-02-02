import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { LessonCreateNestedOneWithoutUser_lesson_progressInput } from '../lesson/lesson-create-nested-one-without-user-lesson-progress.input';
import { CourseCreateNestedOneWithoutUser_lesson_progressInput } from '../course/course-create-nested-one-without-user-lesson-progress.input';

@InputType()
export class UserLessonProgressCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    watched_seconds?: number;

    @Field(() => Int, {nullable:true})
    completed?: number;

    @Field(() => Date, {nullable:true})
    last_accessed?: Date | string;

    @Field(() => GraphQLJSON, {nullable:true})
    segments?: any;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => LessonCreateNestedOneWithoutUser_lesson_progressInput, {nullable:false})
    lesson!: LessonCreateNestedOneWithoutUser_lesson_progressInput;

    @Field(() => CourseCreateNestedOneWithoutUser_lesson_progressInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutUser_lesson_progressInput;
}
