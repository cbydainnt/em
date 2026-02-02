import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput } from '../discount-voucher/discount-voucher-create-nested-one-without-applicable-items.input';
import { CourseCreateNestedOneWithoutDiscount_vouchersInput } from '../course/course-create-nested-one-without-discount-vouchers.input';

@InputType()
export class DiscountVoucherItemCreateWithoutComboInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput, {nullable:false})
    voucher!: DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput;

    @Field(() => CourseCreateNestedOneWithoutDiscount_vouchersInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutDiscount_vouchersInput;
}
