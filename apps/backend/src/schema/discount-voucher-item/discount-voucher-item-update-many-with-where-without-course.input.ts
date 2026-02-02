import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUncheckedUpdateManyWithoutCourseInput } from './discount-voucher-item-unchecked-update-many-without-course.input';

@InputType()
export class DiscountVoucherItemUpdateManyWithWhereWithoutCourseInput {

    @Field(() => DiscountVoucherItemScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    where!: DiscountVoucherItemScalarWhereInput;

    @Field(() => DiscountVoucherItemUncheckedUpdateManyWithoutCourseInput, {nullable:false})
    @Type(() => DiscountVoucherItemUncheckedUpdateManyWithoutCourseInput)
    data!: DiscountVoucherItemUncheckedUpdateManyWithoutCourseInput;
}
