import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { LessonCreateNestedOneWithoutLesson_quizzesInput } from '../lesson/lesson-create-nested-one-without-lesson-quizzes.input';
import { QuizCreateNestedOneWithoutQuiz_lessonsInput } from '../quiz/quiz-create-nested-one-without-quiz-lessons.input';

@InputType()
export class LessonQuizCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => LessonCreateNestedOneWithoutLesson_quizzesInput, {nullable:false})
    lesson!: LessonCreateNestedOneWithoutLesson_quizzesInput;

    @Field(() => QuizCreateNestedOneWithoutQuiz_lessonsInput, {nullable:false})
    quiz!: QuizCreateNestedOneWithoutQuiz_lessonsInput;
}
