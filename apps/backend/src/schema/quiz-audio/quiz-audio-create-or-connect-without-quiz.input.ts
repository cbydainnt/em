import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateWithoutQuizInput } from './quiz-audio-create-without-quiz.input';

@InputType()
export class QuizAudioCreateOrConnectWithoutQuizInput {

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => QuizAudioCreateWithoutQuizInput, {nullable:false})
    @Type(() => QuizAudioCreateWithoutQuizInput)
    create!: QuizAudioCreateWithoutQuizInput;
}
