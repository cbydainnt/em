import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { QuizAudioCountAggregate } from './quiz-audio-count-aggregate.output';
import { QuizAudioAvgAggregate } from './quiz-audio-avg-aggregate.output';
import { QuizAudioSumAggregate } from './quiz-audio-sum-aggregate.output';
import { QuizAudioMinAggregate } from './quiz-audio-min-aggregate.output';
import { QuizAudioMaxAggregate } from './quiz-audio-max-aggregate.output';

@ObjectType()
export class QuizAudioGroupBy {

    @Field(() => String, {nullable:false})
    audio_id!: string;

    @Field(() => String, {nullable:false})
    quiz_id!: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:false})
    audio_url!: string;

    @Field(() => String, {nullable:false})
    file_name!: string;

    @Field(() => Int, {nullable:false})
    duration_seconds!: number;

    @Field(() => String, {nullable:true})
    transcript?: string;

    @Field(() => Int, {nullable:false})
    total_questions!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering?: any;

    @Field(() => QuizAudioCountAggregate, {nullable:true})
    _count?: QuizAudioCountAggregate;

    @Field(() => QuizAudioAvgAggregate, {nullable:true})
    _avg?: QuizAudioAvgAggregate;

    @Field(() => QuizAudioSumAggregate, {nullable:true})
    _sum?: QuizAudioSumAggregate;

    @Field(() => QuizAudioMinAggregate, {nullable:true})
    _min?: QuizAudioMinAggregate;

    @Field(() => QuizAudioMaxAggregate, {nullable:true})
    _max?: QuizAudioMaxAggregate;
}
