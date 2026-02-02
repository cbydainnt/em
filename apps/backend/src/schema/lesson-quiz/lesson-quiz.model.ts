import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Lesson } from '../lesson/lesson.model';
import { Quiz } from '../quiz/quiz.model';

@ObjectType()
export class LessonQuiz {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    lesson_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    order!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Lesson, {nullable:false})
    lesson?: Lesson;

    @Field(() => Quiz, {nullable:false})
    quiz?: Quiz;
}
