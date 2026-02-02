import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateWithoutQuestionsInput } from './quiz-audio-create-without-questions.input';

@InputType()
export class QuizAudioCreateOrConnectWithoutQuestionsInput {

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => QuizAudioCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => QuizAudioCreateWithoutQuestionsInput)
    create!: QuizAudioCreateWithoutQuestionsInput;
}
