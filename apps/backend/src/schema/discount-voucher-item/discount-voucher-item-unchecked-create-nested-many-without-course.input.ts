import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutCourseInput } from './discount-voucher-item-create-without-course.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutCourseInput } from './discount-voucher-item-create-or-connect-without-course.input';
import { DiscountVoucherItemCreateManyCourseInputEnvelope } from './discount-voucher-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';

@InputType()
export class DiscountVoucherItemUncheckedCreateNestedManyWithoutCourseInput {

    @Field(() => [DiscountVoucherItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutCourseInput)
    create?: Array<DiscountVoucherItemCreateWithoutCourseInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutCourseInput>;

    @Field(() => DiscountVoucherItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyCourseInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyCourseInputEnvelope;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;
}
