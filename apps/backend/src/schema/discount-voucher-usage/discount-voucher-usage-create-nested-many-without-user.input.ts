import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutUserInput } from './discount-voucher-usage-create-without-user.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutUserInput } from './discount-voucher-usage-create-or-connect-without-user.input';
import { DiscountVoucherUsageCreateManyUserInputEnvelope } from './discount-voucher-usage-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';

@InputType()
export class DiscountVoucherUsageCreateNestedManyWithoutUserInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutUserInput)
    create?: Array<DiscountVoucherUsageCreateWithoutUserInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutUserInput>;

    @Field(() => DiscountVoucherUsageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyUserInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyUserInputEnvelope;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;
}
