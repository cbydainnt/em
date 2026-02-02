import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CartItemCountAggregate {

    @Field(() => Int, {nullable:false})
    cart_item_id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    added_at!: number;

    @Field(() => Int, {nullable:false})
    selected!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
