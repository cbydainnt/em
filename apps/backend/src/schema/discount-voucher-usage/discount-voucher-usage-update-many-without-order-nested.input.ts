import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutOrderInput } from './discount-voucher-usage-create-without-order.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutOrderInput } from './discount-voucher-usage-create-or-connect-without-order.input';
import { DiscountVoucherUsageUpsertWithWhereUniqueWithoutOrderInput } from './discount-voucher-usage-upsert-with-where-unique-without-order.input';
import { DiscountVoucherUsageCreateManyOrderInputEnvelope } from './discount-voucher-usage-create-many-order-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';
import { DiscountVoucherUsageUpdateWithWhereUniqueWithoutOrderInput } from './discount-voucher-usage-update-with-where-unique-without-order.input';
import { DiscountVoucherUsageUpdateManyWithWhereWithoutOrderInput } from './discount-voucher-usage-update-many-with-where-without-order.input';
import { DiscountVoucherUsageScalarWhereInput } from './discount-voucher-usage-scalar-where.input';

@InputType()
export class DiscountVoucherUsageUpdateManyWithoutOrderNestedInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutOrderInput)
    create?: Array<DiscountVoucherUsageCreateWithoutOrderInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutOrderInput>;

    @Field(() => [DiscountVoucherUsageUpsertWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpsertWithWhereUniqueWithoutOrderInput)
    upsert?: Array<DiscountVoucherUsageUpsertWithWhereUniqueWithoutOrderInput>;

    @Field(() => DiscountVoucherUsageCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyOrderInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyOrderInputEnvelope;

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

    @Field(() => [DiscountVoucherUsageUpdateWithWhereUniqueWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateWithWhereUniqueWithoutOrderInput)
    update?: Array<DiscountVoucherUsageUpdateWithWhereUniqueWithoutOrderInput>;

    @Field(() => [DiscountVoucherUsageUpdateManyWithWhereWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageUpdateManyWithWhereWithoutOrderInput)
    updateMany?: Array<DiscountVoucherUsageUpdateManyWithWhereWithoutOrderInput>;

    @Field(() => [DiscountVoucherUsageScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherUsageScalarWhereInput)
    deleteMany?: Array<DiscountVoucherUsageScalarWhereInput>;
}
