import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { UserCreateNestedOneWithoutUser_lesson_progressInput } from '../user/user-create-nested-one-without-user-lesson-progress.input';
import { CourseCreateNestedOneWithoutUser_lesson_progressInput } from '../course/course-create-nested-one-without-user-lesson-progress.input';

@InputType()
export class UserLessonProgressCreateWithoutLessonInput {

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

    @Field(() => UserCreateNestedOneWithoutUser_lesson_progressInput, {nullable:false})
    user!: UserCreateNestedOneWithoutUser_lesson_progressInput;

    @Field(() => CourseCreateNestedOneWithoutUser_lesson_progressInput, {nullable:false})
    course!: CourseCreateNestedOneWithoutUser_lesson_progressInput;
}
