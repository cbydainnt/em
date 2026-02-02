import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { QuestionCreateNestedManyWithoutAudioInput } from '../question/question-create-nested-many-without-audio.input';

@InputType()
export class QuizAudioCreateWithoutQuizInput {

    @Field(() => String, {nullable:true})
    audio_id?: string;

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

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => GraphQLJSON, {nullable:true})
    question_ordering?: any;

    @Field(() => QuestionCreateNestedManyWithoutAudioInput, {nullable:true})
    questions?: QuestionCreateNestedManyWithoutAudioInput;
}
