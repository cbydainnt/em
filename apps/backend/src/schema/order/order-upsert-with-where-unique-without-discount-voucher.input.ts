import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { Type } from 'class-transformer';
import { OrderUpdateWithoutDiscount_voucherInput } from './order-update-without-discount-voucher.input';
import { OrderCreateWithoutDiscount_voucherInput } from './order-create-without-discount-voucher.input';

@InputType()
export class OrderUpsertWithWhereUniqueWithoutDiscount_voucherInput {

    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;

    @Field(() => OrderUpdateWithoutDiscount_voucherInput, {nullable:false})
    @Type(() => OrderUpdateWithoutDiscount_voucherInput)
    update!: OrderUpdateWithoutDiscount_voucherInput;

    @Field(() => OrderCreateWithoutDiscount_voucherInput, {nullable:false})
    @Type(() => OrderCreateWithoutDiscount_voucherInput)
    create!: OrderCreateWithoutDiscount_voucherInput;
}
