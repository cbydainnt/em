import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Quiz } from '../quiz/quiz.model';
import { UserQuizAnswer } from '../user-quiz-answer/user-quiz-answer.model';
import { Lesson } from '../lesson/lesson.model';
import { Course } from '../course/course.model';
import { UserQuizProgressCount } from './user-quiz-progress-count.output';

@ObjectType()
export class UserQuizProgress {

    @Field(() => ID, {nullable:false})
    progress_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:true})
    lesson_id!: string | null;

    @Field(() => String, {nullable:true})
    course_id!: string | null;

    @Field(() => Float, {nullable:true})
    score!: number | null;

    @Field(() => Float, {nullable:true})
    percentage!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_questions!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    correct_answers!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    status!: number;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    passed!: boolean;

    @Field(() => Int, {nullable:true})
    time_spent!: number | null;

    @Field(() => Date, {nullable:false})
    started_at!: Date;

    @Field(() => Date, {nullable:true})
    completed_at!: Date | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    attempts!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Quiz, {nullable:false})
    quiz?: Quiz;

    @Field(() => [UserQuizAnswer], {nullable:true})
    answers?: Array<UserQuizAnswer>;

    @Field(() => Lesson, {nullable:true})
    lesson?: Lesson | null;

    @Field(() => Course, {nullable:true})
    course?: Course | null;

    @Field(() => UserQuizProgressCount, {nullable:false})
    _count?: UserQuizProgressCount;
}
