import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateWithoutComboInput } from './order-item-create-without-combo.input';
import { Type } from 'class-transformer';
import { OrderItemCreateOrConnectWithoutComboInput } from './order-item-create-or-connect-without-combo.input';
import { OrderItemCreateManyComboInputEnvelope } from './order-item-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';

@InputType()
export class OrderItemCreateNestedManyWithoutComboInput {

    @Field(() => [OrderItemCreateWithoutComboInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutComboInput)
    create?: Array<OrderItemCreateWithoutComboInput>;

    @Field(() => [OrderItemCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutComboInput>;

    @Field(() => OrderItemCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyComboInputEnvelope)
    createMany?: OrderItemCreateManyComboInputEnvelope;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;
}
