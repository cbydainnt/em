import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateWithoutUserInput } from './discount-voucher-user-create-without-user.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUserCreateOrConnectWithoutUserInput } from './discount-voucher-user-create-or-connect-without-user.input';
import { DiscountVoucherUserCreateManyUserInputEnvelope } from './discount-voucher-user-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUserWhereUniqueInput } from './discount-voucher-user-where-unique.input';

@InputType()
export class DiscountVoucherUserCreateNestedManyWithoutUserInput {

    @Field(() => [DiscountVoucherUserCreateWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateWithoutUserInput)
    create?: Array<DiscountVoucherUserCreateWithoutUserInput>;

    @Field(() => [DiscountVoucherUserCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUserCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DiscountVoucherUserCreateOrConnectWithoutUserInput>;

    @Field(() => DiscountVoucherUserCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUserCreateManyUserInputEnvelope)
    createMany?: DiscountVoucherUserCreateManyUserInputEnvelope;

    @Field(() => [DiscountVoucherUserWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUserWhereUniqueInput, 'id' | 'discount_voucher_id_user_id'>>;
}
