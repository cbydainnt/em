import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';

@InputType()
export class QuizAudioListRelationFilter {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    every?: QuizAudioWhereInput;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    some?: QuizAudioWhereInput;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    none?: QuizAudioWhereInput;
}
