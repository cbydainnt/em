import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutDiscount_vouchersInput } from './course-create-without-discount-vouchers.input';

@InputType()
export class CourseCreateOrConnectWithoutDiscount_vouchersInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutDiscount_vouchersInput, {nullable:false})
    @Type(() => CourseCreateWithoutDiscount_vouchersInput)
    create!: CourseCreateWithoutDiscount_vouchersInput;
}
