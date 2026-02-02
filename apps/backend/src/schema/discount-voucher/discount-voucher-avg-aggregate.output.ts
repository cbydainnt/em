import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherAvgAggregate {

    @Field(() => Float, {nullable:true})
    discount_type?: number;

    @Field(() => Float, {nullable:true})
    discount_value?: number;

    @Field(() => Float, {nullable:true})
    min_order_amount?: number;

    @Field(() => Float, {nullable:true})
    applicable_type?: number;

    @Field(() => Float, {nullable:true})
    user_scope?: number;

    @Field(() => Float, {nullable:true})
    usage_limit?: number;

    @Field(() => Float, {nullable:true})
    used_count?: number;

    @Field(() => Float, {nullable:true})
    per_user_limit?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
