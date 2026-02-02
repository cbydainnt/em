import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutDiscount_vouchersInput } from './course-update-without-discount-vouchers.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutDiscount_vouchersInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => CourseUpdateWithoutDiscount_vouchersInput)
    data!: CourseUpdateWithoutDiscount_vouchersInput;
}
