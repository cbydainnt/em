import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';
import { CartItemUpdateWithoutCourseInput } from './cart-item-update-without-course.input';
import { CartItemCreateWithoutCourseInput } from './cart-item-create-without-course.input';

@InputType()
export class CartItemUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>;

    @Field(() => CartItemUpdateWithoutCourseInput, {nullable:false})
    @Type(() => CartItemUpdateWithoutCourseInput)
    update!: CartItemUpdateWithoutCourseInput;

    @Field(() => CartItemCreateWithoutCourseInput, {nullable:false})
    @Type(() => CartItemCreateWithoutCourseInput)
    create!: CartItemCreateWithoutCourseInput;
}
