import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateWithoutDiscount_voucherInput } from './order-create-without-discount-voucher.input';
import { Type } from 'class-transformer';
import { OrderCreateOrConnectWithoutDiscount_voucherInput } from './order-create-or-connect-without-discount-voucher.input';
import { OrderUpsertWithWhereUniqueWithoutDiscount_voucherInput } from './order-upsert-with-where-unique-without-discount-voucher.input';
import { OrderCreateManyDiscount_voucherInputEnvelope } from './order-create-many-discount-voucher-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { OrderUpdateWithWhereUniqueWithoutDiscount_voucherInput } from './order-update-with-where-unique-without-discount-voucher.input';
import { OrderUpdateManyWithWhereWithoutDiscount_voucherInput } from './order-update-many-with-where-without-discount-voucher.input';
import { OrderScalarWhereInput } from './order-scalar-where.input';

@InputType()
export class OrderUpdateManyWithoutDiscount_voucherNestedInput {

    @Field(() => [OrderCreateWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderCreateWithoutDiscount_voucherInput)
    create?: Array<OrderCreateWithoutDiscount_voucherInput>;

    @Field(() => [OrderCreateOrConnectWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderCreateOrConnectWithoutDiscount_voucherInput)
    connectOrCreate?: Array<OrderCreateOrConnectWithoutDiscount_voucherInput>;

    @Field(() => [OrderUpsertWithWhereUniqueWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderUpsertWithWhereUniqueWithoutDiscount_voucherInput)
    upsert?: Array<OrderUpsertWithWhereUniqueWithoutDiscount_voucherInput>;

    @Field(() => OrderCreateManyDiscount_voucherInputEnvelope, {nullable:true})
    @Type(() => OrderCreateManyDiscount_voucherInputEnvelope)
    createMany?: OrderCreateManyDiscount_voucherInputEnvelope;

    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>>;

    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>>;

    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>>;

    @Field(() => [OrderWhereUniqueInput], {nullable:true})
    @Type(() => OrderWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>>;

    @Field(() => [OrderUpdateWithWhereUniqueWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderUpdateWithWhereUniqueWithoutDiscount_voucherInput)
    update?: Array<OrderUpdateWithWhereUniqueWithoutDiscount_voucherInput>;

    @Field(() => [OrderUpdateManyWithWhereWithoutDiscount_voucherInput], {nullable:true})
    @Type(() => OrderUpdateManyWithWhereWithoutDiscount_voucherInput)
    updateMany?: Array<OrderUpdateManyWithWhereWithoutDiscount_voucherInput>;

    @Field(() => [OrderScalarWhereInput], {nullable:true})
    @Type(() => OrderScalarWhereInput)
    deleteMany?: Array<OrderScalarWhereInput>;
}
