import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryComboUncheckedCreateNestedManyWithoutComboInput } from '../category-combo/category-combo-unchecked-create-nested-many-without-combo.input';
import { OrderItemUncheckedCreateNestedManyWithoutComboInput } from '../order-item/order-item-unchecked-create-nested-many-without-combo.input';
import { DiscountVoucherItemUncheckedCreateNestedManyWithoutComboInput } from '../discount-voucher-item/discount-voucher-item-unchecked-create-nested-many-without-combo.input';

@InputType()
export class ComboUncheckedCreateWithoutCoursesInput {

    @Field(() => String, {nullable:true})
    combo_id?: string;

    @Field(() => String, {nullable:false})
    combo_name!: string;

    @Field(() => Int, {nullable:true})
    combo_type?: number;

    @Field(() => Int, {nullable:false})
    original_price!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Boolean, {nullable:true})
    del_flg?: boolean;

    @Field(() => Date, {nullable:true})
    created_at?: Date | string;

    @Field(() => Date, {nullable:true})
    updated_at?: Date | string;

    @Field(() => String, {nullable:true})
    created_by?: string;

    @Field(() => String, {nullable:true})
    updated_by?: string;

    @Field(() => CategoryComboUncheckedCreateNestedManyWithoutComboInput, {nullable:true})
    categories?: CategoryComboUncheckedCreateNestedManyWithoutComboInput;

    @Field(() => OrderItemUncheckedCreateNestedManyWithoutComboInput, {nullable:true})
    order_items?: OrderItemUncheckedCreateNestedManyWithoutComboInput;

    @Field(() => DiscountVoucherItemUncheckedCreateNestedManyWithoutComboInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemUncheckedCreateNestedManyWithoutComboInput;
}
