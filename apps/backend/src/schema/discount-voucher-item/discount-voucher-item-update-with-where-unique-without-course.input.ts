import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DiscountVoucherItemWhereUniqueInput } from './discount-voucher-item-where-unique.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUpdateWithoutCourseInput } from './discount-voucher-item-update-without-course.input';

@InputType()
export class DiscountVoucherItemUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => DiscountVoucherItemWhereUniqueInput, {nullable:false})
    @Type(() => DiscountVoucherItemWhereUniqueInput)
    where!: Prisma.AtLeast<DiscountVoucherItemWhereUniqueInput, 'id' | 'discount_voucher_id_course_id' | 'discount_voucher_id_combo_id'>;

    @Field(() => DiscountVoucherItemUpdateWithoutCourseInput, {nullable:false})
    @Type(() => DiscountVoucherItemUpdateWithoutCourseInput)
    data!: DiscountVoucherItemUpdateWithoutCourseInput;
}
