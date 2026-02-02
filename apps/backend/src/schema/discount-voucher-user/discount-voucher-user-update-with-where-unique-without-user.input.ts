import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserUpdateWithoutUserInput } from './discount-voucher-user-update-without-user.input';

@InputType()
export class DiscountVoucherUserUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUserUpdateWithoutUserInput, {nullable:false})
    @Type(() => DiscountVoucherUserUpdateWithoutUserInput)
    data!: DiscountVoucherUserUpdateWithoutUserInput;
}
