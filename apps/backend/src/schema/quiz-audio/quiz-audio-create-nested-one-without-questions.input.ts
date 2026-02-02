import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizAudioCreateWithoutQuestionsInput } from './quiz-audio-create-without-questions.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateOrConnectWithoutQuestionsInput } from './quiz-audio-create-or-connect-without-questions.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';

@InputType()
export class QuizAudioCreateNestedOneWithoutQuestionsInput {

    @Field(() => QuizAudioCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioCreateWithoutQuestionsInput)
    create?: QuizAudioCreateWithoutQuestionsInput;

    @Field(() => QuizAudioCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => QuizAudioCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: QuizAudioCreateOrConnectWithoutQuestionsInput;

    @Field(() => QuizAudioWhereUniqueInput, {nullable:true})
    @Type(() => QuizAudioWhereUniqueInput)
    connect?: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;
}
