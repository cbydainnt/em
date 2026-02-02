import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OrderItemCountAggregate {

    @Field(() => Int, {nullable:false})
    order_item_id!: number;

    @Field(() => Int, {nullable:false})
    order_id!: number;

    @Field(() => Int, {nullable:false})
    item_type!: number;

    @Field(() => Int, {nullable:false})
    combo_id!: number;

    @Field(() => Int, {nullable:false})
    course_id!: number;

    @Field(() => Int, {nullable:false})
    final_price!: number;

    @Field(() => Int, {nullable:false})
    created_at!: number;

    @Field(() => Int, {nullable:false})
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    del_flg!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
