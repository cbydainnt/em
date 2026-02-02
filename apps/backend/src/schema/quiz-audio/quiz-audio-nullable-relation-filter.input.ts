import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';

@InputType()
export class QuizAudioNullableRelationFilter {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    is?: QuizAudioWhereInput;

    @Field(() => QuizAudioWhereInput, {nullable:true})
    isNot?: QuizAudioWhereInput;
}
