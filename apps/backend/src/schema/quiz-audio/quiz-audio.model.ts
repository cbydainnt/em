import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Quiz } from '../quiz/quiz.model';
import { Question } from '../question/question.model';
import { QuizAudioCount } from './quiz-audio-count.output';

@ObjectType()
export class QuizAudio {

    @Field(() => ID, {nullable:false})
    audio_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:true})
    title!: string | null;

    @Field(() => String, {nullable:false})
    audio_url!: string;

    @Field(() => String, {nullable:false})
    file_name!: string;

    @Field(() => Int, {nullable:false})
    duration_seconds!: number;

    @Field(() => String, {nullable:true})
    transcript!: string | null;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering!: any | null;

    @Field(() => Quiz, {nullable:false})
    quiz?: Quiz;

    @Field(() => [Question], {nullable:true})
    questions?: Array<Question>;

    @Field(() => QuizAudioCount, {nullable:false})
    _count?: QuizAudioCount;
}
