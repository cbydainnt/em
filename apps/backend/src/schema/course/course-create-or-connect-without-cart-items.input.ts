import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCart_itemsInput } from './course-create-without-cart-items.input';

@InputType()
export class CourseCreateOrConnectWithoutCart_itemsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutCart_itemsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCart_itemsInput)
    create!: CourseCreateWithoutCart_itemsInput;
}
