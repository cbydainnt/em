import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutCart_itemsInput } from './course-update-without-cart-items.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutCart_itemsInput } from './course-create-without-cart-items.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutCart_itemsInput {

    @Field(() => CourseUpdateWithoutCart_itemsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutCart_itemsInput)
    update!: CourseUpdateWithoutCart_itemsInput;

    @Field(() => CourseCreateWithoutCart_itemsInput, {nullable:false})
    @Type(() => CourseCreateWithoutCart_itemsInput)
    create!: CourseCreateWithoutCart_itemsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
