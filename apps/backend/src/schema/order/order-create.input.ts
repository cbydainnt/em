import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrderItemCreateNestedManyWithoutOrderInput } from '../order-item/order-item-create-nested-many-without-order.input';
import { UserCreateNestedOneWithoutOrdersInput } from '../user/user-create-nested-one-without-orders.input';
import { DiscountVoucherCreateNestedOneWithoutOrderInput } from '../discount-voucher/discount-voucher-create-nested-one-without-order.input';
import { DiscountVoucherUsageCreateNestedManyWithoutOrderInput } from '../discount-voucher-usage/discount-voucher-usage-create-nested-many-without-order.input';

@InputType()
export class OrderCreateInput {

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

    @Field(() => OrderItemCreateNestedManyWithoutOrderInput, {nullable:true})
    order_items?: OrderItemCreateNestedManyWithoutOrderInput;

    @Field(() => UserCreateNestedOneWithoutOrdersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutOrdersInput;

    @Field(() => DiscountVoucherCreateNestedOneWithoutOrderInput, {nullable:true})
    discount_voucher?: DiscountVoucherCreateNestedOneWithoutOrderInput;

    @Field(() => DiscountVoucherUsageCreateNestedManyWithoutOrderInput, {nullable:true})
    discount_vouchers?: DiscountVoucherUsageCreateNestedManyWithoutOrderInput;
}
