import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderWhereInput } from './order-where.input';
import { Type } from 'class-transformer';
import { OrderUpdateWithoutDiscount_vouchersInput } from './order-update-without-discount-vouchers.input';

@InputType()
export class OrderUpdateToOneWithWhereWithoutDiscount_vouchersInput {

    @Field(() => OrderWhereInput, {nullable:true})
    @Type(() => OrderWhereInput)
    where?: OrderWhereInput;

    @Field(() => OrderUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => OrderUpdateWithoutDiscount_vouchersInput)
    data!: OrderUpdateWithoutDiscount_vouchersInput;
}
