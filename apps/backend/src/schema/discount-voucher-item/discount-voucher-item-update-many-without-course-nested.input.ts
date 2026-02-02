import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemCreateWithoutCourseInput } from './discount-voucher-item-create-without-course.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemCreateOrConnectWithoutCourseInput } from './discount-voucher-item-create-or-connect-without-course.input';
import { DiscountVoucherItemUpsertWithWhereUniqueWithoutCourseInput } from './discount-voucher-item-upsert-with-where-unique-without-course.input';
import { DiscountVoucherItemCreateManyCourseInputEnvelope } from './discount-voucher-item-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { DiscountVoucherItemUpdateWithWhereUniqueWithoutCourseInput } from './discount-voucher-item-update-with-where-unique-without-course.input';
import { DiscountVoucherItemUpdateManyWithWhereWithoutCourseInput } from './discount-voucher-item-update-many-with-where-without-course.input';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';

@InputType()
export class DiscountVoucherItemUpdateManyWithoutCourseNestedInput {

    @Field(() => [DiscountVoucherItemCreateWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateWithoutCourseInput)
    create?: Array<DiscountVoucherItemCreateWithoutCourseInput>;

    @Field(() => [DiscountVoucherItemCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<DiscountVoucherItemCreateOrConnectWithoutCourseInput>;

    @Field(() => [DiscountVoucherItemUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<DiscountVoucherItemUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => DiscountVoucherItemCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => DiscountVoucherItemCreateManyCourseInputEnvelope)
    createMany?: DiscountVoucherItemCreateManyCourseInputEnvelope;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemWhereUniqueInput], {nullable:true})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>>;

    @Field(() => [DiscountVoucherItemUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<DiscountVoucherItemUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [DiscountVoucherItemUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => DiscountVoucherItemUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<DiscountVoucherItemUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [DiscountVoucherItemScalarWhereInput], {nullable:true})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    deleteMany?: Array<DiscountVoucherItemScalarWhereInput>;
}
