import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutOrder_itemsInput } from './course-create-without-order-items.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutOrder_itemsInput } from './course-create-or-connect-without-order-items.input';
import { CourseUpsertWithoutOrder_itemsInput } from './course-upsert-without-order-items.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutOrder_itemsInput } from './course-update-to-one-with-where-without-order-items.input';

@InputType()
export class CourseUpdateOneWithoutOrder_itemsNestedInput {

    @Field(() => CourseCreateWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseCreateWithoutOrder_itemsInput)
    create?: CourseCreateWithoutOrder_itemsInput;

    @Field(() => CourseCreateOrConnectWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutOrder_itemsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutOrder_itemsInput;

    @Field(() => CourseUpsertWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutOrder_itemsInput)
    upsert?: CourseUpsertWithoutOrder_itemsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutOrder_itemsInput)
    update?: CourseUpdateToOneWithWhereWithoutOrder_itemsInput;
}
