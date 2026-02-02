import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutOrder_itemsInput } from './course-create-without-order-items.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutOrder_itemsInput } from './course-create-or-connect-without-order-items.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutOrder_itemsInput {

    @Field(() => CourseCreateWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseCreateWithoutOrder_itemsInput)
    create?: CourseCreateWithoutOrder_itemsInput;

    @Field(() => CourseCreateOrConnectWithoutOrder_itemsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutOrder_itemsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutOrder_itemsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
