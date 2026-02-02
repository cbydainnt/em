import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherUsageUncheckedCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;
}
