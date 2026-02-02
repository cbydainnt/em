import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Type } from 'class-transformer';
import { QuizAudioCreateInput } from './quiz-audio-create.input';
import { QuizAudioUpdateInput } from './quiz-audio-update.input';

@ArgsType()
export class UpsertOneQuizAudioArgs {

    @Field(() => QuizAudioWhereUniqueInput, {nullable:false})
    @Type(() => QuizAudioWhereUniqueInput)
    where!: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => QuizAudioCreateInput, {nullable:false})
    @Type(() => QuizAudioCreateInput)
    create!: QuizAudioCreateInput;

    @Field(() => QuizAudioUpdateInput, {nullable:false})
    @Type(() => QuizAudioUpdateInput)
    update!: QuizAudioUpdateInput;
}
