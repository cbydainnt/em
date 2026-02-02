import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutOrder_itemsInput } from './course-create-without-order-items.input';

@InputType()
export class CourseCreateOrConnectWithoutOrder_itemsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => CourseCreateWithoutOrder_itemsInput)
    create!: CourseCreateWithoutOrder_itemsInput;
}
