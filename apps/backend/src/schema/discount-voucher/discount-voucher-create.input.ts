import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { DiscountVoucherItemCreateNestedManyWithoutVoucherInput } from '../discount-voucher-item/discount-voucher-item-create-nested-many-without-voucher.input';
import { DiscountVoucherUserCreateNestedManyWithoutVoucherInput } from '../discount-voucher-user/discount-voucher-user-create-nested-many-without-voucher.input';
import { DiscountVoucherUsageCreateNestedManyWithoutVoucherInput } from '../discount-voucher-usage/discount-voucher-usage-create-nested-many-without-voucher.input';
import { OrderCreateNestedManyWithoutDiscount_voucherInput } from '../order/order-create-nested-many-without-discount-voucher.input';

@InputType()
export class DiscountVoucherCreateInput {

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

    @Field(() => DiscountVoucherItemCreateNestedManyWithoutVoucherInput, {nullable:true})
    applicable_items?: DiscountVoucherItemCreateNestedManyWithoutVoucherInput;

    @Field(() => DiscountVoucherUserCreateNestedManyWithoutVoucherInput, {nullable:true})
    applicable_users?: DiscountVoucherUserCreateNestedManyWithoutVoucherInput;

    @Field(() => DiscountVoucherUsageCreateNestedManyWithoutVoucherInput, {nullable:true})
    used_by?: DiscountVoucherUsageCreateNestedManyWithoutVoucherInput;

    @Field(() => OrderCreateNestedManyWithoutDiscount_voucherInput, {nullable:true})
    order?: OrderCreateNestedManyWithoutDiscount_voucherInput;
}
