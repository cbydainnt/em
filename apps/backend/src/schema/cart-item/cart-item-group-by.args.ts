import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CartItemWhereInput } from './cart-item-where.input';
import { Type } from 'class-transformer';
import { CartItemOrderByWithAggregationInput } from './cart-item-order-by-with-aggregation.input';
import { CartItemScalarFieldEnum } from './cart-item-scalar-field.enum';
import { CartItemScalarWhereWithAggregatesInput } from './cart-item-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CartItemCountAggregateInput } from './cart-item-count-aggregate.input';
import { CartItemMinAggregateInput } from './cart-item-min-aggregate.input';
import { CartItemMaxAggregateInput } from './cart-item-max-aggregate.input';

@ArgsType()
export class CartItemGroupByArgs {

    @Field(() => CartItemWhereInput, {nullable:true})
    @Type(() => CartItemWhereInput)
    where?: CartItemWhereInput;

    @Field(() => [CartItemOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CartItemOrderByWithAggregationInput>;

    @Field(() => [CartItemScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CartItemScalarFieldEnum>;

    @Field(() => CartItemScalarWhereWithAggregatesInput, {nullable:true})
    having?: CartItemScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CartItemCountAggregateInput, {nullable:true})
    _count?: CartItemCountAggregateInput;

    @Field(() => CartItemMinAggregateInput, {nullable:true})
    _min?: CartItemMinAggregateInput;

    @Field(() => CartItemMaxAggregateInput, {nullable:true})
    _max?: CartItemMaxAggregateInput;
}
