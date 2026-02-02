import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { CategoryComboListRelationFilter } from '../category-combo/category-combo-list-relation-filter.input';
import { ComboCourseListRelationFilter } from '../combo-course/combo-course-list-relation-filter.input';
import { OrderItemListRelationFilter } from '../order-item/order-item-list-relation-filter.input';
import { DiscountVoucherItemListRelationFilter } from '../discount-voucher-item/discount-voucher-item-list-relation-filter.input';

@InputType()
export class ComboWhereInput {

    @Field(() => [ComboWhereInput], {nullable:true})
    AND?: Array<ComboWhereInput>;

    @Field(() => [ComboWhereInput], {nullable:true})
    OR?: Array<ComboWhereInput>;

    @Field(() => [ComboWhereInput], {nullable:true})
    NOT?: Array<ComboWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    combo_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    combo_name?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    combo_type?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    original_price?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    price?: IntFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    created_by?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    updated_by?: StringNullableFilter;

    @Field(() => CategoryComboListRelationFilter, {nullable:true})
    categories?: CategoryComboListRelationFilter;

    @Field(() => ComboCourseListRelationFilter, {nullable:true})
    courses?: ComboCourseListRelationFilter;

    @Field(() => OrderItemListRelationFilter, {nullable:true})
    order_items?: OrderItemListRelationFilter;

    @Field(() => DiscountVoucherItemListRelationFilter, {nullable:true})
    discount_vouchers?: DiscountVoucherItemListRelationFilter;
}
