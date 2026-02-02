import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserDiscount_voucher_idUser_idCompoundUniqueInput } from './discount-voucher-user-discount-voucher-id-user-id-compound-unique.input';
import { DiscountVoucherUserWhereInput } from './discount-voucher-user-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DiscountVoucherRelationFilter } from '../discount-voucher/discount-voucher-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class DiscountVoucherUserWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherUserDiscount_voucher_idUser_idCompoundUniqueInput, {nullable:true})
    discount_voucher_id_user_id?: DiscountVoucherUserDiscount_voucher_idUser_idCompoundUniqueInput;

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => [DiscountVoucherUserWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => DiscountVoucherRelationFilter, {nullable:true})
    voucher?: DiscountVoucherRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;
}
