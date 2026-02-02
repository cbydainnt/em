import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuizCreateNestedOneWithoutQuiz_lessonsInput } from '../quiz/quiz-create-nested-one-without-quiz-lessons.input';

@InputType()
export class LessonQuizCreateWithoutLessonInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => QuizCreateNestedOneWithoutQuiz_lessonsInput, {nullable:false})
    quiz!: QuizCreateNestedOneWithoutQuiz_lessonsInput;
}
