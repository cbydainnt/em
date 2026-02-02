import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { Type } from 'class-transformer';
import { OrderItemUpdateWithoutCourseInput } from './order-item-update-without-course.input';
import { OrderItemCreateWithoutCourseInput } from './order-item-create-without-course.input';

@InputType()
export class OrderItemUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>;

    @Field(() => OrderItemUpdateWithoutCourseInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutCourseInput)
    update!: OrderItemUpdateWithoutCourseInput;

    @Field(() => OrderItemCreateWithoutCourseInput, {nullable:false})
    @Type(() => OrderItemCreateWithoutCourseInput)
    create!: OrderItemCreateWithoutCourseInput;
}
