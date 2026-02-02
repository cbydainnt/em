import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutDiscount_vouchersInput } from './course-create-without-discount-vouchers.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutDiscount_vouchersInput } from './course-create-or-connect-without-discount-vouchers.input';
import { CourseUpsertWithoutDiscount_vouchersInput } from './course-upsert-without-discount-vouchers.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutDiscount_vouchersInput } from './course-update-to-one-with-where-without-discount-vouchers.input';

@InputType()
export class CourseUpdateOneWithoutDiscount_vouchersNestedInput {

    @Field(() => CourseCreateWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseCreateWithoutDiscount_vouchersInput)
    create?: CourseCreateWithoutDiscount_vouchersInput;

    @Field(() => CourseCreateOrConnectWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutDiscount_vouchersInput)
    connectOrCreate?: CourseCreateOrConnectWithoutDiscount_vouchersInput;

    @Field(() => CourseUpsertWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseUpsertWithoutDiscount_vouchersInput)
    upsert?: CourseUpsertWithoutDiscount_vouchersInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutDiscount_vouchersInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutDiscount_vouchersInput)
    update?: CourseUpdateToOneWithWhereWithoutDiscount_vouchersInput;
}
