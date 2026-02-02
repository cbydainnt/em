import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutCart_itemsInput } from './course-update-without-cart-items.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutCart_itemsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutCart_itemsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCart_itemsInput)
    data!: CourseUpdateWithoutCart_itemsInput;
}
