import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutOrderInput } from './discount-voucher-usage-create-without-order.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutOrderInput } from './discount-voucher-usage-create-or-connect-without-order.input';
import { DiscountVoucherUsageCreateManyOrderInputEnvelope } from './discount-voucher-usage-create-many-order-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';

@InputType()
export class DiscountVoucherUsageCreateNestedManyWithoutOrderInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutOrderInput)
    create?: Array<DiscountVoucherUsageCreateWithoutOrderInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutOrderInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutOrderInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutOrderInput>;

    @Field(() => DiscountVoucherUsageCreateManyOrderInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyOrderInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyOrderInputEnvelope;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;
}
