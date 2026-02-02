import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderCreateManyDiscount_voucherInput } from './order-create-many-discount-voucher.input';
import { Type } from 'class-transformer';

@InputType()
export class OrderCreateManyDiscount_voucherInputEnvelope {

    @Field(() => [OrderCreateManyDiscount_voucherInput], {nullable:false})
    @Type(() => OrderCreateManyDiscount_voucherInput)
    data!: Array<OrderCreateManyDiscount_voucherInput>;
}
