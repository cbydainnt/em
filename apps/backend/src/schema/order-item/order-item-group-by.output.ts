import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderItemCountAggregate } from './order-item-count-aggregate.output';
import { OrderItemAvgAggregate } from './order-item-avg-aggregate.output';
import { OrderItemSumAggregate } from './order-item-sum-aggregate.output';
import { OrderItemMinAggregate } from './order-item-min-aggregate.output';
import { OrderItemMaxAggregate } from './order-item-max-aggregate.output';

@ObjectType()
export class OrderItemGroupBy {

    @Field(() => String, {nullable:false})
    order_item_id!: string;

    @Field(() => String, {nullable:false})
    order_id!: string;

    @Field(() => Int, {nullable:false})
    item_type!: number;

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:true})
    course_id?: string;

    @Field(() => Int, {nullable:false})
    final_price!: number;

    @Field(() => Date, {nullable:false})
    created_at!: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => Boolean, {nullable:false})
    del_flg!: boolean;

    @Field(() => OrderItemCountAggregate, {nullable:true})
    _count?: OrderItemCountAggregate;

    @Field(() => OrderItemAvgAggregate, {nullable:true})
    _avg?: OrderItemAvgAggregate;

    @Field(() => OrderItemSumAggregate, {nullable:true})
    _sum?: OrderItemSumAggregate;

    @Field(() => OrderItemMinAggregate, {nullable:true})
    _min?: OrderItemMinAggregate;

    @Field(() => OrderItemMaxAggregate, {nullable:true})
    _max?: OrderItemMaxAggregate;
}
