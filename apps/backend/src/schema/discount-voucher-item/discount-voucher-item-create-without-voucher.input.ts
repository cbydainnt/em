import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateNestedOneWithoutDiscount_vouchersInput } from '../course/course-create-nested-one-without-discount-vouchers.input';
import { ComboCreateNestedOneWithoutDiscount_vouchersInput } from '../combo/combo-create-nested-one-without-discount-vouchers.input';

@InputType()
export class DiscountVoucherItemCreateWithoutVoucherInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CourseCreateNestedOneWithoutDiscount_vouchersInput, {nullable:true})
    course?: CourseCreateNestedOneWithoutDiscount_vouchersInput;

    @Field(() => ComboCreateNestedOneWithoutDiscount_vouchersInput, {nullable:true})
    combo?: ComboCreateNestedOneWithoutDiscount_vouchersInput;
}
