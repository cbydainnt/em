import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizOrderByWithRelationInput } from './quiz-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QuizCountAggregateInput } from './quiz-count-aggregate.input';
import { QuizAvgAggregateInput } from './quiz-avg-aggregate.input';
import { QuizSumAggregateInput } from './quiz-sum-aggregate.input';
import { QuizMinAggregateInput } from './quiz-min-aggregate.input';
import { QuizMaxAggregateInput } from './quiz-max-aggregate.input';

@ArgsType()
export class QuizAggregateArgs {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => [QuizOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<QuizOrderByWithRelationInput>;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => QuizCountAggregateInput, {nullable:true})
    _count?: QuizCountAggregateInput;

    @Field(() => QuizAvgAggregateInput, {nullable:true})
    _avg?: QuizAvgAggregateInput;

    @Field(() => QuizSumAggregateInput, {nullable:true})
    _sum?: QuizSumAggregateInput;

    @Field(() => QuizMinAggregateInput, {nullable:true})
    _min?: QuizMinAggregateInput;

    @Field(() => QuizMaxAggregateInput, {nullable:true})
    _max?: QuizMaxAggregateInput;
}
