import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OrderMinAggregate {

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => Int, {nullable:true})
    total_price?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Int, {nullable:true})
    payment_method?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    discount_voucher_id?: string;
}
