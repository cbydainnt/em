import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUncheckedUpdateManyWithoutComboInput } from './discount-voucher-item-unchecked-update-many-without-combo.input';

@InputType()
export class DiscountVoucherItemUpdateManyWithWhereWithoutComboInput {

    @Field(() => DiscountVoucherItemScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    where!: DiscountVoucherItemScalarWhereInput;

    @Field(() => DiscountVoucherItemUncheckedUpdateManyWithoutComboInput, {nullable:false})
    @Type(() => DiscountVoucherItemUncheckedUpdateManyWithoutComboInput)
    data!: DiscountVoucherItemUncheckedUpdateManyWithoutComboInput;
}
