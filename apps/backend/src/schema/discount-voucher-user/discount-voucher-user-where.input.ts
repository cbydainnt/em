import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class DiscountVoucherUserWhereInput {

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => DiscountVoucherRelationFilter, {nullable:true})
    voucher?: DiscountVoucherRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;
}
