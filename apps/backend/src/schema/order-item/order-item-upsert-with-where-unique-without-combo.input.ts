import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { Type } from 'class-transformer';
import { OrderItemUpdateWithoutComboInput } from './order-item-update-without-combo.input';
import { OrderItemCreateWithoutComboInput } from './order-item-create-without-combo.input';

@InputType()
export class OrderItemUpsertWithWhereUniqueWithoutComboInput {

    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>;

    @Field(() => OrderItemUpdateWithoutComboInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutComboInput)
    update!: OrderItemUpdateWithoutComboInput;

    @Field(() => OrderItemCreateWithoutComboInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutComboInput)
    create!: OrderItemCreateWithoutComboInput;
}
