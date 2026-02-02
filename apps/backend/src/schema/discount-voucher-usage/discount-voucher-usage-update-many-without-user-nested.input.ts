import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutUserInput } from './discount-voucher-usage-create-without-user.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutUserInput } from './discount-voucher-usage-create-or-connect-without-user.input';
import { DiscountVoucherUsageUpsertWithWhereUniqueWithoutUserInput } from './discount-voucher-usage-upsert-with-where-unique-without-user.input';
import { DiscountVoucherUsageCreateManyUserInputEnvelope } from './discount-voucher-usage-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { DiscountVoucherUsageUpdateWithWhereUniqueWithoutUserInput } from './discount-voucher-usage-update-with-where-unique-without-user.input';
import { DiscountVoucherUsageUpdateManyWithWhereWithoutUserInput } from './discount-voucher-usage-update-many-with-where-without-user.input';
import { DiscountVoucherUsageScalarWhereInput } from './discount-voucher-usage-scalar-where.input';

@InputType()
export class DiscountVoucherUsageUpdateManyWithoutUserNestedInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutUserInput)
    create?: Array<DiscountVoucherUsageCreateWithoutUserInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutUserInput>;

    @Field(() => [DiscountVoucherUsageUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DiscountVoucherUsageUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => DiscountVoucherUsageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyUserInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyUserInputEnvelope;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;

    @Field(() => [DiscountVoucherUsageUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DiscountVoucherUsageUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [DiscountVoucherUsageUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DiscountVoucherUsageUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherUsageScalarWhereInput)
    deleteMany?: Array<DiscountVoucherUsageScalarWhereInput>;
}
