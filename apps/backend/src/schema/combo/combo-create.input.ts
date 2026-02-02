import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryComboCreateNestedManyWithoutComboInput } from '../category-combo/category-combo-create-nested-many-without-combo.input';
import { ComboCourseCreateNestedManyWithoutComboInput } from '../combo-course/combo-course-create-nested-many-without-combo.input';
import { OrderItemCreateNestedManyWithoutComboInput } from '../order-item/order-item-create-nested-many-without-combo.input';
import { DiscountVoucherItemCreateNestedManyWithoutComboInput } from '../discount-voucher-item/discount-voucher-item-create-nested-many-without-combo.input';

@InputType()
export class ComboCreateInput {

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

    @Field(() => CategoryComboCreateNestedManyWithoutComboInput, {nullable:true})
    categories?: CategoryComboCreateNestedManyWithoutComboInput;

    @Field(() => ComboCourseCreateNestedManyWithoutComboInput, {nullable:true})
    courses?: ComboCourseCreateNestedManyWithoutComboInput;

    @Field(() => OrderItemCreateNestedManyWithoutComboInput, {nullable:true})
    order_items?: OrderItemCreateNestedManyWithoutComboInput;

    @Field(() => DiscountVoucherItemCreateNestedManyWithoutComboInput, {nullable:true})
    discount_vouchers?: DiscountVoucherItemCreateNestedManyWithoutComboInput;
}
