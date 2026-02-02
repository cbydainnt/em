import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Quiz } from '../quiz/quiz.model';
import { QuizAudio } from '../quiz-audio/quiz-audio.model';
import { Answer } from '../answer/answer.model';
import { UserQuizAnswer } from '../user-quiz-answer/user-quiz-answer.model';
import { ReadingPassage } from '../reading-passage/reading-passage.model';
import { QuestionCount } from './question-count.output';

@ObjectType()
export class Question {

    @Field(() => ID, {nullable:false})
    question_id!: string;

    @Field(() => String, {nullable:true})
    quiz_id!: string | null;

    @Field(() => String, {nullable:false})
    question_text!: string;

    @Field(() => String, {nullable:true})
    question_image!: string | null;

    @Field(() => Int, {nullable:false,defaultValue:1})
    question_type!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    order!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    points!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    difficulty!: number;

    @Field(() => String, {nullable:true})
    explanation!: string | null;

    @Field(() => String, {nullable:true})
    audio_id!: string | null;

    @Field(() => Int, {nullable:true})
    audio_order!: number | null;

    @Field(() => String, {nullable:true})
    reading_passage_id!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => Quiz, {nullable:true})
    quiz?: Quiz | null;

    @Field(() => QuizAudio, {nullable:true})
    audio?: QuizAudio | null;

    @Field(() => [Answer], {nullable:true})
    answers?: Array<Answer>;

    @Field(() => [UserQuizAnswer], {nullable:true})
    user_answers?: Array<UserQuizAnswer>;

    @Field(() => ReadingPassage, {nullable:true})
    reading_passage?: ReadingPassage | null;

    @Field(() => QuestionCount, {nullable:false})
    _count?: QuestionCount;
}
