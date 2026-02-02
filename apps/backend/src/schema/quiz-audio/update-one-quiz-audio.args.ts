import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioUpdateInput } from './quiz-audio-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';

@ArgsType()
export class UpdateOneQuizAudioArgs {

    @Field(() => QuizAudioUpdateInput, {nullable:false})
    @Type(() => QuizAudioUpdateInput)
    data!: QuizAudioUpdateInput;

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;
}
