import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Type } from 'class-transformer';
import { QuizAudioUpdateWithoutQuizInput } from './quiz-audio-update-without-quiz.input';

@InputType()
export class QuizAudioUpdateWithWhereUniqueWithoutQuizInput {

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => QuizAudioUpdateWithoutQuizInput, {nullable:false})
    @Type(() => QuizAudioUpdateWithoutQuizInput)
    data!: QuizAudioUpdateWithoutQuizInput;
}
