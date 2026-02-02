import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateWithoutDiscount_voucherInput } from './order-create-without-discount-voucher.input';
import { Type } from 'class-transformer';
import { OrderCreateOrConnectWithoutDiscount_voucherInput } from './order-create-or-connect-without-discount-voucher.input';
import { OrderCreateManyDiscount_voucherInputEnvelope } from './order-create-many-discount-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';

@InputType()
export class OrderUncheckedCreateNestedManyWithoutDiscount_voucherInput {

    @Field(() => [OrderCreateWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderCreateWithoutDiscount_voucherInput)
    create?: Array<OrderCreateWithoutDiscount_voucherInput>;

    @Field(() => [OrderCreateOrConnectWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutDiscount_voucherInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutDiscount_voucherInput>;

    @Field(() => OrderCreateManyDiscount_voucherInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyDiscount_voucherInputEnvelope)
    createMany?: OrderCreateManyDiscount_voucherInputEnvelope;

    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>>;
}
