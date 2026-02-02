import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutOrder_itemsInput } from './course-update-without-order-items.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutOrder_itemsInput } from './course-create-without-order-items.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutOrder_itemsInput {

    @Field(() => CourseUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutOrder_itemsInput)
    update!: CourseUpdateWithoutOrder_itemsInput;

    @Field(() => CourseCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => CourseCreateWithoutOrder_itemsInput)
    create!: CourseCreateWithoutOrder_itemsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
