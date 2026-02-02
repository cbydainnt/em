import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateOneWithoutDiscount_vouchersNestedInput } from '../course/course-update-one-without-discount-vouchers-nested.input';
import { ComboUpdateOneWithoutDiscount_vouchersNestedInput } from '../combo/combo-update-one-without-discount-vouchers-nested.input';

@InputType()
export class DiscountVoucherItemUpdateWithoutVoucherInput {

    @Field(() => CourseUpdateOneWithoutDiscount_vouchersNestedInput, {nullable:true})
    course?: CourseUpdateOneWithoutDiscount_vouchersNestedInput;

    @Field(() => ComboUpdateOneWithoutDiscount_vouchersNestedInput, {nullable:true})
    combo?: ComboUpdateOneWithoutDiscount_vouchersNestedInput;
}
