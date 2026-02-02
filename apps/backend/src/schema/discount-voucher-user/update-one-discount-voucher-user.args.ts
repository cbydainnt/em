import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUserUpdateInput } from './discount-voucher-user-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';

@ArgsType()
export class UpdateOneDiscountVoucherUserArgs {

    @Field(() => DiscountVoucherUserUpdateInput, {nullable:false})
    @Type(() => DiscountVoucherUserUpdateInput)
    data!: DiscountVoucherUserUpdateInput;

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;
}
