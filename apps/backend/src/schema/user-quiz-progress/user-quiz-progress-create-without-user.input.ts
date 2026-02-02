import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuizCreateNestedOneWithoutUser_progressInput } from '../quiz/quiz-create-nested-one-without-user-progress.input';
import { UserQuizAnswerCreateNestedManyWithoutProgressInput } from '../user-quiz-answer/user-quiz-answer-create-nested-many-without-progress.input';
import { LessonCreateNestedOneWithoutUser_quiz_progressInput } from '../lesson/lesson-create-nested-one-without-user-quiz-progress.input';
import { CourseCreateNestedOneWithoutUser_quiz_progressInput } from '../course/course-create-nested-one-without-user-quiz-progress.input';

@InputType()
export class UserQuizProgressCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    progress_id?: string;

    @Field(() => Float, {nullable:true})
    score?: number;

    @Field(() => Float, {nullable:true})
    percentage?: number;

    @Field(() => Int, {nullable:true})
    total_questions?: number;

    @Field(() => Int, {nullable:true})
    correct_answers?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Boolean, {nullable:true})
    passed?: boolean;

    @Field(() => Int, {nullable:true})
    time_spent?: number;

    @Field(() => Date, {nullable:true})
    started_at?: Date | string;

    @Field(() => Date, {nullable:true})
    completed_at?: Date | string;

    @Field(() => Int, {nullable:true})
    attempts?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => QuizCreateNestedOneWithoutUser_progressInput, {nullable:false})
    quiz!: QuizCreateNestedOneWithoutUser_progressInput;

    @Field(() => UserQuizAnswerCreateNestedManyWithoutProgressInput, {nullable:true})
    answers?: UserQuizAnswerCreateNestedManyWithoutProgressInput;

    @Field(() => LessonCreateNestedOneWithoutUser_quiz_progressInput, {nullable:true})
    lesson?: LessonCreateNestedOneWithoutUser_quiz_progressInput;

    @Field(() => CourseCreateNestedOneWithoutUser_quiz_progressInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutUser_quiz_progressInput;
}
