import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Type } from 'class-transformer';
import { QuizAudioOrderByWithRelationInput } from './quiz-audio-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { QuizAudioWhereUniqueInput } from './quiz-audio-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QuizAudioCountAggregateInput } from './quiz-audio-count-aggregate.input';
import { QuizAudioAvgAggregateInput } from './quiz-audio-avg-aggregate.input';
import { QuizAudioSumAggregateInput } from './quiz-audio-sum-aggregate.input';
import { QuizAudioMinAggregateInput } from './quiz-audio-min-aggregate.input';
import { QuizAudioMaxAggregateInput } from './quiz-audio-max-aggregate.input';

@ArgsType()
export class QuizAudioAggregateArgs {

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

    @Field(() => QuizAudioCountAggregateInput, {nullable:true})
    _count?: QuizAudioCountAggregateInput;

    @Field(() => QuizAudioAvgAggregateInput, {nullable:true})
    _avg?: QuizAudioAvgAggregateInput;

    @Field(() => QuizAudioSumAggregateInput, {nullable:true})
    _sum?: QuizAudioSumAggregateInput;

    @Field(() => QuizAudioMinAggregateInput, {nullable:true})
    _min?: QuizAudioMinAggregateInput;

    @Field(() => QuizAudioMaxAggregateInput, {nullable:true})
    _max?: QuizAudioMaxAggregateInput;
}
