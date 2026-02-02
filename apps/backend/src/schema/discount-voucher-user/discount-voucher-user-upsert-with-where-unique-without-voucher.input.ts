import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserUpdateWithoutVoucherInput } from './discount-voucher-user-update-without-voucher.input';
import { DiscountVoucherUserCreateWithoutVoucherInput } from './discount-voucher-user-create-without-voucher.input';

@InputType()
export class DiscountVoucherUserUpsertWithWhereUniqueWithoutVoucherInput {

    @Field(() => DiscountVoucherUserWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>;

    @Field(() => DiscountVoucherUserUpdateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUserUpdateWithoutVoucherInput)
    update!: DiscountVoucherUserUpdateWithoutVoucherInput;

    @Field(() => DiscountVoucherUserCreateWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherUserCreateWithoutVoucherInput)
    create!: DiscountVoucherUserCreateWithoutVoucherInput;
}
