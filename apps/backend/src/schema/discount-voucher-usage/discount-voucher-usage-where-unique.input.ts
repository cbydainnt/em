import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageDiscount_voucher_idUser_idCompoundUniqueInput } from './discount-voucher-usage-discount-voucher-id-user-id-compound-unique.input';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { OrderNullableRelationFilter } from '../order/order-nullable-relation-filter.input';

@InputType()
export class DiscountVoucherUsageWhereUniqueInput {

    @Field(() => String, {nullable:true})
    voucher_usage_id?: string;

    @Field(() => DiscountVoucherUsageDiscount_voucher_idUser_idCompoundUniqueInput, {nullable:true})
    discount_voucher_id_user_id?: DiscountVoucherUsageDiscount_voucher_idUser_idCompoundUniqueInput;

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => [DiscountVoucherUsageWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUsageWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    order_id?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    used_at?: DateTimeFilter;

    @Field(() => DiscountVoucherRelationFilter, {nullable:true})
    voucher?: DiscountVoucherRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => OrderNullableRelationFilter, {nullable:true})
    order?: OrderNullableRelationFilter;
}
