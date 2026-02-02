import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrderItemCreateWithoutCourseInput } from './order-item-create-without-course.input';
import { Type } from 'class-transformer';
import { OrderItemCreateOrConnectWithoutCourseInput } from './order-item-create-or-connect-without-course.input';
import { OrderItemCreateManyCourseInputEnvelope } from './order-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';

@InputType()
export class OrderItemCreateNestedManyWithoutCourseInput {

    @Field(() => [OrderItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemCreateWithoutCourseInput)
    create?: Array<OrderItemCreateWithoutCourseInput>;

    @Field(() => [OrderItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => OrderItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<OrderItemCreateOrConnectWithoutCourseInput>;

    @Field(() => OrderItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => OrderItemCreateManyCourseInputEnvelope)
    createMany?: OrderItemCreateManyCourseInputEnvelope;

    @Field(() => [OrderItemWhereUniqueInput], {nullable:true})
    @Type(() => OrderItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>>;
}
