import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizOrderByWithAggregationInput } from './quiz-order-by-with-aggregation.input';
import { QuizScalarFieldEnum } from './quiz-scalar-field.enum';
import { QuizScalarWhereWithAggregatesInput } from './quiz-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { QuizCountAggregateInput } from './quiz-count-aggregate.input';
import { QuizAvgAggregateInput } from './quiz-avg-aggregate.input';
import { QuizSumAggregateInput } from './quiz-sum-aggregate.input';
import { QuizMinAggregateInput } from './quiz-min-aggregate.input';
import { QuizMaxAggregateInput } from './quiz-max-aggregate.input';

@ArgsType()
export class QuizGroupByArgs {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => [QuizOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<QuizOrderByWithAggregationInput>;

    @Field(() => [QuizScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof QuizScalarFieldEnum>;

    @Field(() => QuizScalarWhereWithAggregatesInput, {nullable:true})
    having?: QuizScalarWhereWithAggregatesInput;

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
