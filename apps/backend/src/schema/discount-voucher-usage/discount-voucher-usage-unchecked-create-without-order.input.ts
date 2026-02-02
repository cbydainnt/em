import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherUsageUncheckedCreateWithoutOrderInput {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;
}
