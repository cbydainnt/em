import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderUpdateWithoutDiscount_vouchersInput } from './order-update-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { OrderCreateWithoutDiscount_vouchersInput } from './order-create-without-discount-vouchers.input';
import { OrderWhereInput } from './order-where.input';

@InputType()
export class OrderUpsertWithoutDiscount_vouchersInput {

    @Field(() => OrderUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => OrderUpdateWithoutDiscount_vouchersInput)
    update!: OrderUpdateWithoutDiscount_vouchersInput;

    @Field(() => OrderCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => OrderCreateWithoutDiscount_vouchersInput)
    create!: OrderCreateWithoutDiscount_vouchersInput;

    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: OrderWhereInput;
}
