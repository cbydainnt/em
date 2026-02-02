import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemWhereInput } from './m-system-where.input';
import { Type } from 'class-transformer';
import { MSystemOrderByWithAggregationInput } from './m-system-order-by-with-aggregation.input';
import { MSystemScalarFieldEnum } from './m-system-scalar-field.enum';
import { MSystemScalarWhereWithAggregatesInput } from './m-system-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { MSystemCountAggregateInput } from './m-system-count-aggregate.input';
import { MSystemAvgAggregateInput } from './m-system-avg-aggregate.input';
import { MSystemSumAggregateInput } from './m-system-sum-aggregate.input';
import { MSystemMinAggregateInput } from './m-system-min-aggregate.input';
import { MSystemMaxAggregateInput } from './m-system-max-aggregate.input';

@ArgsType()
export class MSystemGroupByArgs {

    @Field(() => MSystemWhereInput, {nullable:true})
    @Type(() => MSystemWhereInput)
    where?: MSystemWhereInput;

    @Field(() => [MSystemOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<MSystemOrderByWithAggregationInput>;

    @Field(() => [MSystemScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof MSystemScalarFieldEnum>;

    @Field(() => MSystemScalarWhereWithAggregatesInput, {nullable:true})
    having?: MSystemScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => MSystemCountAggregateInput, {nullable:true})
    _count?: MSystemCountAggregateInput;

    @Field(() => MSystemAvgAggregateInput, {nullable:true})
    _avg?: MSystemAvgAggregateInput;

    @Field(() => MSystemSumAggregateInput, {nullable:true})
    _sum?: MSystemSumAggregateInput;

    @Field(() => MSystemMinAggregateInput, {nullable:true})
    _min?: MSystemMinAggregateInput;

    @Field(() => MSystemMaxAggregateInput, {nullable:true})
    _max?: MSystemMaxAggregateInput;
}
