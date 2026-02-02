import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CartItemCountAggregate } from './cart-item-count-aggregate.output';
import { CartItemMinAggregate } from './cart-item-min-aggregate.output';
import { CartItemMaxAggregate } from './cart-item-max-aggregate.output';

@ObjectType()
export class AggregateCartItem {

    @Field(() => CartItemCountAggregate, {nullable:true})
    _count?: CartItemCountAggregate;

    @Field(() => CartItemMinAggregate, {nullable:true})
    _min?: CartItemMinAggregate;

    @Field(() => CartItemMaxAggregate, {nullable:true})
    _max?: CartItemMaxAggregate;
}
