import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutVoucherInput } from './discount-voucher-usage-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutVoucherInput } from './discount-voucher-usage-create-or-connect-without-voucher.input';
import { DiscountVoucherUsageUpsertWithWhereUniqueWithoutVoucherInput } from './discount-voucher-usage-upsert-with-where-unique-without-voucher.input';
import { DiscountVoucherUsageCreateManyVoucherInputEnvelope } from './discount-voucher-usage-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { DiscountVoucherUsageUpdateWithWhereUniqueWithoutVoucherInput } from './discount-voucher-usage-update-with-where-unique-without-voucher.input';
import { DiscountVoucherUsageUpdateManyWithWhereWithoutVoucherInput } from './discount-voucher-usage-update-many-with-where-without-voucher.input';
import { DiscountVoucherUsageScalarWhereInput } from './discount-voucher-usage-scalar-where.input';

@InputType()
export class DiscountVoucherUsageUncheckedUpdateManyWithoutVoucherNestedInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherUsageCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUsageUpsertWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpsertWithWhereUniqueWithoutVoucherInput)
    upsert?: Array<DiscountVoucherUsageUpsertWithWhereUniqueWithoutVoucherInput>;

    @Field(() => DiscountVoucherUsageCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyVoucherInputEnvelope;

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

    @Field(() => [DiscountVoucherUsageUpdateWithWhereUniqueWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateWithWhereUniqueWithoutVoucherInput)
    update?: Array<DiscountVoucherUsageUpdateWithWhereUniqueWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUsageUpdateManyWithWhereWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateManyWithWhereWithoutVoucherInput)
    updateMany?: Array<DiscountVoucherUsageUpdateManyWithWhereWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherUsageScalarWhereInput)
    deleteMany?: Array<DiscountVoucherUsageScalarWhereInput>;
}
