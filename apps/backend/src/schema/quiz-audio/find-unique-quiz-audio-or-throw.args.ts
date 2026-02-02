import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueQuizAudioOrThrowArgs {

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;
}
