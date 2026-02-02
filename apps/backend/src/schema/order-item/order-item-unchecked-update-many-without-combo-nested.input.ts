import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateWithoutComboInput } from './order-item-create-without-combo.input';
import { Type } from 'class-transformer';
import { OrderItemCreateOrConnectWithoutComboInput } from './order-item-create-or-connect-without-combo.input';
import { OrderItemUpsertWithWhereUniqueWithoutComboInput } from './order-item-upsert-with-where-unique-without-combo.input';
import { OrderItemCreateManyComboInputEnvelope } from './order-item-create-many-combo-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { OrderItemUpdateWithWhereUniqueWithoutComboInput } from './order-item-update-with-where-unique-without-combo.input';
import { OrderItemUpdateManyWithWhereWithoutComboInput } from './order-item-update-many-with-where-without-combo.input';
import { OrderItemScalarWhereInput } from './order-item-scalar-where.input';

@InputType()
export class OrderItemUncheckedUpdateManyWithoutComboNestedInput {

    @Field(() => [OrderItemCreateWithoutComboInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutComboInput)
    create?: Array<OrderItemCreateWithoutComboInput>;

    @Field(() => [OrderItemCreateOrConnectWithoutComboInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutComboInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutComboInput>;

    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutComboInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutComboInput>;

    @Field(() => OrderItemCreateManyComboInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyComboInputEnvelope)
    createMany?: OrderItemCreateManyComboInputEnvelope;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;

    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutComboInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutComboInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutComboInput>;

    @Field(() => [OrderItemUpdateManyWithWhereWithoutComboInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutComboInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutComboInput>;

    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}
