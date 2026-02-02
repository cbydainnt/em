import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CartItemCreateWithoutCourseInput } from './cart-item-create-without-course.input';
import { Type } from 'class-transformer';
import { CartItemCreateOrConnectWithoutCourseInput } from './cart-item-create-or-connect-without-course.input';
import { CartItemUpsertWithWhereUniqueWithoutCourseInput } from './cart-item-upsert-with-where-unique-without-course.input';
import { CartItemCreateManyCourseInputEnvelope } from './cart-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { CartItemUpdateWithWhereUniqueWithoutCourseInput } from './cart-item-update-with-where-unique-without-course.input';
import { CartItemUpdateManyWithWhereWithoutCourseInput } from './cart-item-update-many-with-where-without-course.input';
import { CartItemScalarWhereInput } from './cart-item-scalar-where.input';

@InputType()
export class CartItemUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [CartItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => CartItemCreateWithoutCourseInput)
    create?: Array<CartItemCreateWithoutCourseInput>;

    @Field(() => [CartItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CartItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CartItemCreateOrConnectWithoutCourseInput>;

    @Field(() => [CartItemUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CartItemUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<CartItemUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => CartItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CartItemCreateManyCourseInputEnvelope)
    createMany?: CartItemCreateManyCourseInputEnvelope;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemWhereUniqueInput], {nullable:true})
    @Type(() => CartItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CartItemWhereUniqueInput, 'cart_item_id' | 'user_id_course_id'>>;

    @Field(() => [CartItemUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CartItemUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<CartItemUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [CartItemUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => CartItemUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<CartItemUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [CartItemScalarWhereInput], {nullable:true})
    @Type(() => CartItemScalarWhereInput)
    deleteMany?: Array<CartItemScalarWhereInput>;
}
