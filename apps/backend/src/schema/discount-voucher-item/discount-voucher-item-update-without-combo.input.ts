import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUpdateOneRequiredWithoutApplicable_itemsNestedInput } from '../discount-voucher/discount-voucher-update-one-required-without-applicable-items-nested.input';
import { CourseUpdateOneWithoutDiscount_vouchersNestedInput } from '../course/course-update-one-without-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherItemUpdateWithoutComboInput {

    @Field(() => DiscountVoucherUpdateOneRequiredWithoutApplicable_itemsNestedInput, {nullable:true})
    voucher?: DiscountVoucherUpdateOneRequiredWithoutApplicable_itemsNestedInput;

    @Field(() => CourseUpdateOneWithoutDiscount_vouchersNestedInput, {nullable:true})
    course?: CourseUpdateOneWithoutDiscount_vouchersNestedInput;
}
