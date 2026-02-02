import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateManyComboInput } from './order-item-create-many-combo.input';
import { Type } from 'class-transformer';

@InputType()
export class OrderItemCreateManyComboInputEnvelope {

    @Field(() => [OrderItemCreateManyComboInput], {nullable:false})
    @Type(() => OrderItemCreateManyComboInput)
    data!: Array<OrderItemCreateManyComboInput>;
}
