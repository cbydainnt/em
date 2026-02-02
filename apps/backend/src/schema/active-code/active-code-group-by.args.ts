import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeWhereInput } from './active-code-where.input';
import { Type } from 'class-transformer';
import { ActiveCodeOrderByWithAggregationInput } from './active-code-order-by-with-aggregation.input';
import { ActiveCodeScalarFieldEnum } from './active-code-scalar-field.enum';
import { ActiveCodeScalarWhereWithAggregatesInput } from './active-code-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ActiveCodeCountAggregateInput } from './active-code-count-aggregate.input';
import { ActiveCodeAvgAggregateInput } from './active-code-avg-aggregate.input';
import { ActiveCodeSumAggregateInput } from './active-code-sum-aggregate.input';
import { ActiveCodeMinAggregateInput } from './active-code-min-aggregate.input';
import { ActiveCodeMaxAggregateInput } from './active-code-max-aggregate.input';

@ArgsType()
export class ActiveCodeGroupByArgs {

    @Field(() => ActiveCodeWhereInput, {nullable:true})
    @Type(() => ActiveCodeWhereInput)
    where?: ActiveCodeWhereInput;

    @Field(() => [ActiveCodeOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ActiveCodeOrderByWithAggregationInput>;

    @Field(() => [ActiveCodeScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ActiveCodeScalarFieldEnum>;

    @Field(() => ActiveCodeScalarWhereWithAggregatesInput, {nullable:true})
    having?: ActiveCodeScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ActiveCodeCountAggregateInput, {nullable:true})
    _count?: ActiveCodeCountAggregateInput;

    @Field(() => ActiveCodeAvgAggregateInput, {nullable:true})
    _avg?: ActiveCodeAvgAggregateInput;

    @Field(() => ActiveCodeSumAggregateInput, {nullable:true})
    _sum?: ActiveCodeSumAggregateInput;

    @Field(() => ActiveCodeMinAggregateInput, {nullable:true})
    _min?: ActiveCodeMinAggregateInput;

    @Field(() => ActiveCodeMaxAggregateInput, {nullable:true})
    _max?: ActiveCodeMaxAggregateInput;
}
