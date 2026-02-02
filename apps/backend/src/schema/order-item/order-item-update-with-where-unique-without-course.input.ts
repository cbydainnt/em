import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInput } from './order-item-where-unique.input';
import { Type } from 'class-transformer';
import { OrderItemUpdateWithoutCourseInput } from './order-item-update-without-course.input';

@InputType()
export class OrderItemUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => OrderItemWhereUniqueInput, {nullable:false})
    @Type(() => OrderItemWhereUniqueInput)
    where!: Prisma.AtLeast<OrderItemWhereUniqueInput, 'order_item_id'>;

    @Field(() => OrderItemUpdateWithoutCourseInput, {nullable:false})
    @Type(() => OrderItemUpdateWithoutCourseInput)
    data!: OrderItemUpdateWithoutCourseInput;
}
