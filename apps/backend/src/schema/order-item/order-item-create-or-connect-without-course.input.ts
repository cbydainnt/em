import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { Type } from 'class-transformer';
import { OrderItemCreateWithoutCourseInput } from './order-item-create-without-course.input';

@InputType()
export class OrderItemCreateOrConnectWithoutCourseInput {

    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>;

    @Field(() => OrderItemCreateWithoutCourseInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutCourseInput)
    create!: OrderItemCreateWithoutCourseInput;
}
