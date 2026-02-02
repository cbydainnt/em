import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherItemUncheckedCreateNestedManyWithoutVoucherInput } from '../discount-voucher-item/discount-voucher-item-unchecked-create-nested-many-without-voucher.input';
import { DiscountVoucherUserUncheckedCreateNestedManyWithoutVoucherInput } from '../discount-voucher-user/discount-voucher-user-unchecked-create-nested-many-without-voucher.input';
import { OrderUncheckedCreateNestedManyWithoutDiscount_voucherInput } from '../order/order-unchecked-create-nested-many-without-discount-voucher.input';

@InputType()
export class DiscountVoucherUncheckedCreateWithoutUsed_byInput {

    @Field(() => String, {nullable:true})
    discount_voucher_id?: string;

    @Field(() => String, {nullable:false})
    code!: string;

    @Field(() => Int, {nullable:true})
    discount_type?: number;

    @Field(() => Int, {nullable:false})
    discount_value!: number;

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

    @Field(() => DiscountVoucherItemUncheckedCreateNestedManyWithoutVoucherInput, {nullable:true})
    applicable_items?: DiscountVoucherItemUncheckedCreateNestedManyWithoutVoucherInput;

    @Field(() => DiscountVoucherUserUncheckedCreateNestedManyWithoutVoucherInput, {nullable:true})
    applicable_users?: DiscountVoucherUserUncheckedCreateNestedManyWithoutVoucherInput;

    @Field(() => OrderUncheckedCreateNestedManyWithoutDiscount_voucherInput, {nullable:true})
    order?: OrderUncheckedCreateNestedManyWithoutDiscount_voucherInput;
}
