import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizAudioWhereInput } from './quiz-audio-where.input';
import { Type } from 'class-transformer';
import { QuizAudioOrderByWithAggregationInput } from './quiz-audio-order-by-with-aggregation.input';
import { QuizAudioScalarFieldEnum } from './quiz-audio-scalar-field.enum';
import { QuizAudioScalarWhereWithAggregatesInput } from './quiz-audio-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { QuizAudioCountAggregateInput } from './quiz-audio-count-aggregate.input';
import { QuizAudioAvgAggregateInput } from './quiz-audio-avg-aggregate.input';
import { QuizAudioSumAggregateInput } from './quiz-audio-sum-aggregate.input';
import { QuizAudioMinAggregateInput } from './quiz-audio-min-aggregate.input';
import { QuizAudioMaxAggregateInput } from './quiz-audio-max-aggregate.input';

@ArgsType()
export class QuizAudioGroupByArgs {

    @Field(() => QuizAudioWhereInput, {nullable:true})
    @Type(() => QuizAudioWhereInput)
    where?: QuizAudioWhereInput;

    @Field(() => [QuizAudioOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<QuizAudioOrderByWithAggregationInput>;

    @Field(() => [QuizAudioScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof QuizAudioScalarFieldEnum>;

    @Field(() => QuizAudioScalarWhereWithAggregatesInput, {nullable:true})
    having?: QuizAudioScalarWhereWithAggregatesInput;

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
