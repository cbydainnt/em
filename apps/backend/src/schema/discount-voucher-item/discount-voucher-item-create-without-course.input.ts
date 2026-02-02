import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput } from '../discount-voucher/discount-voucher-create-nested-one-without-applicable-items.input';
import { ComboCreateNestedOneWithoutDiscount_vouchersInput } from '../combo/combo-create-nested-one-without-discount-vouchers.input';

@InputType()
export class DiscountVoucherItemCreateWithoutCourseInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput, {nullable:false})
    voucher!: DiscountVoucherCreateNestedOneWithoutApplicable_itemsInput;

    @Field(() => ComboCreateNestedOneWithoutDiscount_vouchersInput, {nullable:true})
    combo?: ComboCreateNestedOneWithoutDiscount_vouchersInput;
}
