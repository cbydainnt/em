import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCart_itemsInput } from './course-create-without-cart-items.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCart_itemsInput } from './course-create-or-connect-without-cart-items.input';
import { CourseUpsertWithoutCart_itemsInput } from './course-upsert-without-cart-items.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutCart_itemsInput } from './course-update-to-one-with-where-without-cart-items.input';

@InputType()
export class CourseUpdateOneRequiredWithoutCart_itemsNestedInput {

    @Field(() => CourseCreateWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCart_itemsInput)
    create?: CourseCreateWithoutCart_itemsInput;

    @Field(() => CourseCreateOrConnectWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCart_itemsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCart_itemsInput;

    @Field(() => CourseUpsertWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutCart_itemsInput)
    upsert?: CourseUpsertWithoutCart_itemsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutCart_itemsInput)
    update?: CourseUpdateToOneWithWhereWithoutCart_itemsInput;
}
