import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutOrder_itemsInput } from './course-update-without-order-items.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutOrder_itemsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutOrder_itemsInput)
    data!: CourseUpdateWithoutOrder_itemsInput;
}
