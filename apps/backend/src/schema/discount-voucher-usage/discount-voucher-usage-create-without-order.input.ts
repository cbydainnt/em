import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateNestedOneWithoutUsed_byInput } from '../discount-voucher/discount-voucher-create-nested-one-without-used-by.input';
import { UserCreateNestedOneWithoutDiscount_vouchersInput } from '../user/user-create-nested-one-without-discount-vouchers.input';

@InputType()
export class DiscountVoucherUsageCreateWithoutOrderInput {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => Date, {nullable:true})
    used_at?: Date | string;

    @Field(() => DiscountVoucherCreateNestedOneWithoutUsed_byInput, {nullable:false})
    voucher!: DiscountVoucherCreateNestedOneWithoutUsed_byInput;

    @Field(() => UserCreateNestedOneWithoutDiscount_vouchersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutDiscount_vouchersInput;
}
