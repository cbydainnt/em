import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { QuizCreateNestedOneWithoutQuestionsInput } from '../quiz/quiz-create-nested-one-without-questions.input';
import { AnswerCreateNestedManyWithoutQuestionInput } from '../answer/answer-create-nested-many-without-question.input';
import { UserQuizAnswerCreateNestedManyWithoutQuestionInput } from '../user-quiz-answer/user-quiz-answer-create-nested-many-without-question.input';
import { ReadingPassageCreateNestedOneWithoutQuestionsInput } from '../reading-passage/reading-passage-create-nested-one-without-questions.input';

@InputType()
export class QuestionCreateWithoutAudioInput {

    @Field(() => String, {nullable:true})
    question_id?: string;

    @Field(() => String, {nullable:false})
    question_text!: string;

    @Field(() => String, {nullable:true})
    question_image?: string;

    @Field(() => Int, {nullable:true})
    question_type?: number;

    @Field(() => Int, {nullable:true})
    order?: number;

    @Field(() => Int, {nullable:true})
    points?: number;

    @Field(() => Int, {nullable:true})
    difficulty?: number;

    @Field(() => String, {nullable:true})
    explanation?: string;

    @Field(() => Int, {nullable:true})
    audio_order?: number;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => QuizCreateNestedOneWithoutQuestionsInput, {nullable:true})
    quiz?: QuizCreateNestedOneWithoutQuestionsInput;

    @Field(() => AnswerCreateNestedManyWithoutQuestionInput, {nullable:true})
    answers?: AnswerCreateNestedManyWithoutQuestionInput;

    @Field(() => UserQuizAnswerCreateNestedManyWithoutQuestionInput, {nullable:true})
    user_answers?: UserQuizAnswerCreateNestedManyWithoutQuestionInput;

    @Field(() => ReadingPassageCreateNestedOneWithoutQuestionsInput, {nullable:true})
    reading_passage?: ReadingPassageCreateNestedOneWithoutQuestionsInput;
}
