import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderWhereUniqueInput } from './order-where-unique.input';
import { Type } from 'class-transformer';
import { OrderCreateWithoutDiscount_voucherInput } from './order-create-without-discount-voucher.input';

@InputType()
export class OrderCreateOrConnectWithoutDiscount_voucherInput {

    @Field(() => OrderWhereUniqueInput, {nullable:false})
    @Type(() => OrderWhereUniqueInput)
    where!: Prisma.AtLeast<OrderWhereUniqueInput, 'order_id'>;

    @Field(() => OrderCreateWithoutDiscount_voucherInput, {nullable:false})
    @Type(() => OrderCreateWithoutDiscount_voucherInput)
    create!: OrderCreateWithoutDiscount_voucherInput;
}
