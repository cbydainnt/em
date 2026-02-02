import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutCart_itemsInput } from './course-create-without-cart-items.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutCart_itemsInput } from './course-create-or-connect-without-cart-items.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutCart_itemsInput {

    @Field(() => CourseCreateWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseCreateWithoutCart_itemsInput)
    create?: CourseCreateWithoutCart_itemsInput;

    @Field(() => CourseCreateOrConnectWithoutCart_itemsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutCart_itemsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutCart_itemsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
