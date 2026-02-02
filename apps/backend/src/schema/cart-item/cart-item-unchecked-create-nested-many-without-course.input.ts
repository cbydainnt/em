import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateWithoutCourseInput } from './cart-item-create-without-course.input';
import { Type } from 'class-transformer';
import { CartItemCreateOrConnectWithoutCourseInput } from './cart-item-create-or-connect-without-course.input';
import { CartItemCreateManyCourseInputEnvelope } from './cart-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';

@InputType()
export class CartItemUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [CartItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => CartItemCreateWithoutCourseInput)
    create?: Array<CartItemCreateWithoutCourseInput>;

    @Field(() => [CartItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CartItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CartItemCreateOrConnectWithoutCourseInput>;

    @Field(() => CartItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CartItemCreateManyCourseInputEnvelope)
    createMany?: CartItemCreateManyCourseInputEnvelope;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;
}
