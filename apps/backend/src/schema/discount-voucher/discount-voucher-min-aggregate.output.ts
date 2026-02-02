import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherMinAggregate {

    @Field(() => String, {nullable:true})
    discount_voucher_id?: string;

    @Field(() => String, {nullable:true})
    code?: string;

    @Field(() => Int, {nullable:true})
    discount_type?: number;

    @Field(() => Int, {nullable:true})
    discount_value?: number;

    @Field(() => Int, {nullable:true})
    min_order_amount?: number;

    @Field(() => Int, {nullable:true})
    applicable_type?: number;

    @Field(() => Int, {nullable:true})
    user_scope?: number;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Int, {nullable:true})
    usage_limit?: number;

    @Field(() => Int, {nullable:true})
    used_count?: number;

    @Field(() => Int, {nullable:true})
    per_user_limit?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;
}
