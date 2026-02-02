import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateWithoutCourseInput } from './order-item-create-without-course.input';
import { Type } from 'class-transformer';
import { OrderItemCreateOrConnectWithoutCourseInput } from './order-item-create-or-connect-without-course.input';
import { OrderItemUpsertWithWhereUniqueWithoutCourseInput } from './order-item-upsert-with-where-unique-without-course.input';
import { OrderItemCreateManyCourseInputEnvelope } from './order-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { OrderItemUpdateWithWhereUniqueWithoutCourseInput } from './order-item-update-with-where-unique-without-course.input';
import { OrderItemUpdateManyWithWhereWithoutCourseInput } from './order-item-update-many-with-where-without-course.input';
import { OrderItemScalarWhereInput } from './order-item-scalar-where.input';

@InputType()
export class OrderItemUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [OrderItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutCourseInput)
    create?: Array<OrderItemCreateWithoutCourseInput>;

    @Field(() => [OrderItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutCourseInput>;

    @Field(() => [OrderItemUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<OrderItemUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => OrderItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyCourseInputEnvelope)
    createMany?: OrderItemCreateManyCourseInputEnvelope;

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

    @Field(() => [OrderItemUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<OrderItemUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [OrderItemUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<OrderItemUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [OrderItemScalarWhereInput], {nullable:true})
    @Type(() => OrderItemScalarWhereInput)
    deleteMany?: Array<OrderItemScalarWhereInput>;
}
