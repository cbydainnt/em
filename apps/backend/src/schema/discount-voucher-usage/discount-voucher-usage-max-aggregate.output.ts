import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherUsageMaxAggregate {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => String, {nullable:true})
    discount_voucher_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;
}
