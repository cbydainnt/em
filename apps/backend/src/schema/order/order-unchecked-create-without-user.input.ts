import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderItemUncheckedCreateNestedManyWithoutOrderInput } from '../order-item/order-item-unchecked-create-nested-many-without-order.input';
import { DiscountVoucherUsageUncheckedCreateNestedManyWithoutOrderInput } from '../discount-voucher-usage/discount-voucher-usage-unchecked-create-nested-many-without-order.input';

@InputType()
export class OrderUncheckedCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    order_id?: string;

    @Field(() => Int, {nullable:false})
    total_price!: number;

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

    @Field(() => OrderItemUncheckedCreateNestedManyWithoutOrderInput, {nullable:true})
    order_items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;

    @Field(() => DiscountVoucherUsageUncheckedCreateNestedManyWithoutOrderInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageUncheckedCreateNestedManyWithoutOrderInput;
}
