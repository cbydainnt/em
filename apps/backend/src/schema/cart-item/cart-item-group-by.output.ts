import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CartItemCountAggregate } from './cart-item-count-aggregate.output';
import { CartItemMinAggregate } from './cart-item-min-aggregate.output';
import { CartItemMaxAggregate } from './cart-item-max-aggregate.output';

@ObjectType()
export class CartItemGroupBy {

    @Field(() => String, {nullable:false})
    cart_item_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:false})
    added_at!: Date | string;

    @Field(() => Boolean, {nullable:false})
    selected!: boolean;

    @Field(() => CartItemCountAggregate, {nullable:true})
    _count?: CartItemCountAggregate;

    @Field(() => CartItemMinAggregate, {nullable:true})
    _min?: CartItemMinAggregate;

    @Field(() => CartItemMaxAggregate, {nullable:true})
    _max?: CartItemMaxAggregate;
}
