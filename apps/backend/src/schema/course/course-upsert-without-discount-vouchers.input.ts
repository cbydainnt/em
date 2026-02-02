import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutDiscount_vouchersInput } from './course-update-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutDiscount_vouchersInput } from './course-create-without-discount-vouchers.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutDiscount_vouchersInput {

    @Field(() => CourseUpdateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => CourseUpdateWithoutDiscount_vouchersInput)
    update!: CourseUpdateWithoutDiscount_vouchersInput;

    @Field(() => CourseCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => CourseCreateWithoutDiscount_vouchersInput)
    create!: CourseCreateWithoutDiscount_vouchersInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
