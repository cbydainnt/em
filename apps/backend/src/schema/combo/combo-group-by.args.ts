import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboOrderByWithAggregationInput } from './combo-order-by-with-aggregation.input';
import { ComboScalarFieldEnum } from './combo-scalar-field.enum';
import { ComboScalarWhereWithAggregatesInput } from './combo-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ComboCountAggregateInput } from './combo-count-aggregate.input';
import { ComboAvgAggregateInput } from './combo-avg-aggregate.input';
import { ComboSumAggregateInput } from './combo-sum-aggregate.input';
import { ComboMinAggregateInput } from './combo-min-aggregate.input';
import { ComboMaxAggregateInput } from './combo-max-aggregate.input';

@ArgsType()
export class ComboGroupByArgs {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => [ComboOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ComboOrderByWithAggregationInput>;

    @Field(() => [ComboScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof ComboScalarFieldEnum>;

    @Field(() => ComboScalarWhereWithAggregatesInput, {nullable:true})
    having?: ComboScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ComboCountAggregateInput, {nullable:true})
    _count?: ComboCountAggregateInput;

    @Field(() => ComboAvgAggregateInput, {nullable:true})
    _avg?: ComboAvgAggregateInput;

    @Field(() => ComboSumAggregateInput, {nullable:true})
    _sum?: ComboSumAggregateInput;

    @Field(() => ComboMinAggregateInput, {nullable:true})
    _min?: ComboMinAggregateInput;

    @Field(() => ComboMaxAggregateInput, {nullable:true})
    _max?: ComboMaxAggregateInput;
}
