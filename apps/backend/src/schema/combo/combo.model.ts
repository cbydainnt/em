import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CategoryCombo } from '../category-combo/category-combo.model';
import { ComboCourse } from '../combo-course/combo-course.model';
import { OrderItem } from '../order-item/order-item.model';
import { DiscountVoucherItem } from '../discount-voucher-item/discount-voucher-item.model';
import { ComboCount } from './combo-count.output';

@ObjectType()
export class Combo {

    @Field(() => ID, {nullable:false})
    combo_id!: string;

    @Field(() => String, {nullable:false})
    combo_name!: string;

    @Field(() => Int, {nullable:false,defaultValue:1})
    combo_type!: number;

    @Field(() => Int, {nullable:false})
    original_price!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    del_flg!: boolean;

    @Field(() => Date, {nullable:false})
    created_at!: Date;

    @Field(() => Date, {nullable:false})
    updated_at!: Date;

    @Field(() => String, {nullable:true})
    created_by!: string | null;

    @Field(() => String, {nullable:true})
    updated_by!: string | null;

    @Field(() => [CategoryCombo], {nullable:true})
    categories?: Array<CategoryCombo>;

    @Field(() => [ComboCourse], {nullable:true})
    courses?: Array<ComboCourse>;

    @Field(() => [OrderItem], {nullable:true})
    order_items?: Array<OrderItem>;

    @Field(() => [DiscountVoucherItem], {nullable:true})
    discount_vouchers?: Array<DiscountVoucherItem>;

    @Field(() => ComboCount, {nullable:false})
    _count?: ComboCount;
}
