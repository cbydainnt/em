import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutDiscount_vouchersInput } from './course-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutDiscount_vouchersInput } from './course-create-or-connect-without-discount-vouchers.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutDiscount_vouchersInput {

    @Field(() => CourseCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseCreateWithoutDiscount_vouchersInput)
    create?: CourseCreateWithoutDiscount_vouchersInput;

    @Field(() => CourseCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: CourseCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}
