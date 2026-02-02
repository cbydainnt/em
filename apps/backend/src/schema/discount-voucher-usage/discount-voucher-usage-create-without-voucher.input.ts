import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutDiscount_vouchersInput } from '../user/user-create-nested-one-without-discount-vouchers.input';
import { OrderCreateNestedOneWithoutDiscount_vouchersInput } from '../order/order-create-nested-one-without-discount-vouchers.input';

@InputType()
export class DiscountVoucherUsageCreateWithoutVoucherInput {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;

    @Field(() => UserCreateNestedOneWithoutDiscount_vouchersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutDiscount_vouchersInput;

    @Field(() => OrderCreateNestedOneWithoutDiscount_vouchersInput, {nullable:true})
    order?: OrderCreateNestedOneWithoutDiscount_vouchersInput;
}
