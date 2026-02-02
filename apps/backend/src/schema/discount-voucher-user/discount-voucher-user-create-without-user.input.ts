import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherCreateNestedOneWithoutApplicable_usersInput } from '../discount-voucher/discount-voucher-create-nested-one-without-applicable-users.input';

@InputType()
export class DiscountVoucherUserCreateWithoutUserInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => DiscountVoucherCreateNestedOneWithoutApplicable_usersInput, {nullable:false})
    voucher!: DiscountVoucherCreateNestedOneWithoutApplicable_usersInput;
}
