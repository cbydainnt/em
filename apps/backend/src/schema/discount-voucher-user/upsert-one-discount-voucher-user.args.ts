import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserCreateInput } from './discount-voucher-user-create.input';
import { DiscountVoucherUserUpdateInput } from './discount-voucher-user-update.input';

@ArgsType()
export class UpsertOneDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUserCreateInput, {nullable:false})
    @Type(() => DiscountVoucherUserCreateInput)
    create!: DiscountVoucherUserCreateInput;

    @Field(() => DiscountVoucherUserUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUserUpdateInput)
    update!: DiscountVoucherUserUpdateInput;
}
