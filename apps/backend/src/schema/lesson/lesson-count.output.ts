import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LessonCount {

    @Field(() => Int, {nullable:false})
    comments?: number;

    @Field(() => Int, {nullable:false})
    notifications?: number;

    @Field(() => Int, {nullable:false})
    documents?: number;

    @Field(() => Int, {nullable:false})
    user_lesson_progress?: number;

    @Field(() => Int, {nullable:false})
    user_quiz_progress?: number;

    @Field(() => Int, {nullable:false})
    notes?: number;

    @Field(() => Int, {nullable:false})
    reports?: number;

    @Field(() => Int, {nullable:false})
    lesson_quizzes?: number;
}
