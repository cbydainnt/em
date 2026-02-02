import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserUpdateWithoutVoucherInput } from './discount-voucher-user-update-without-voucher.input';

@InputType()
export class DiscountVoucherUserUpdateWithWhereUniqueWithoutVoucherInput {

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUserUpdateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUserUpdateWithoutVoucherInput)
    data!: DiscountVoucherUserUpdateWithoutVoucherInput;
}
