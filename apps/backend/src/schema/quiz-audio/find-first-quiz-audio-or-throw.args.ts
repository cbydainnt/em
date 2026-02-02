import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Type } from 'class-transformer';
import { QuizAudioOrderByWithRelationInput } from './quiz-audio-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QuizAudioScalarFieldEnum } from './quiz-audio-scalar-field.enum';

@ArgsType()
export class FindFirstQuizAudioOrThrowArgs {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;

    @Field(() => [QuizAudioOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<QuizAudioOrderByWithRelationInput>;

    @Field(() => QuizAudioWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<QuizAudioWhereUniqueInput, 'audio_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [QuizAudioScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof QuizAudioScalarFieldEnum>;
}
