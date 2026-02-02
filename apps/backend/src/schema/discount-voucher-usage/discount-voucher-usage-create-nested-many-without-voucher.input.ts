import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageCreateWithoutVoucherInput } from './discount-voucher-usage-create-without-voucher.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageCreateOrConnectWithoutVoucherInput } from './discount-voucher-usage-create-or-connect-without-voucher.input';
import { DiscountVoucherUsageCreateManyVoucherInputEnvelope } from './discount-voucher-usage-create-many-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherUsageWhereUniqueInput } from './discount-voucher-usage-where-unique.input';

@InputType()
export class DiscountVoucherUsageCreateNestedManyWithoutVoucherInput {

    @Field(() => [DiscountVoucherUsageCreateWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateWithoutVoucherInput)
    create?: Array<DiscountVoucherUsageCreateWithoutVoucherInput>;

    @Field(() => [DiscountVoucherUsageCreateOrConnectWithoutVoucherInput], {nullable:true})
    @Type(() => DiscountVoucherUsageCreateOrConnectWithoutVoucherInput)
    connectOrCreate?: Array<DiscountVoucherUsageCreateOrConnectWithoutVoucherInput>;

    @Field(() => DiscountVoucherUsageCreateManyVoucherInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherUsageCreateManyVoucherInputEnvelope)
    createMany?: DiscountVoucherUsageCreateManyVoucherInputEnvelope;

    @Field(() => [DiscountVoucherUsageWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherUsageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherUsageWhereUniqueInput, 'voucher_usage_id' | 'discount_voucher_id_user_id'>>;
}
