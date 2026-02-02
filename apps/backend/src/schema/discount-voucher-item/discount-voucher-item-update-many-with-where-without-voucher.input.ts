import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherItemScalarWhereInput } from './discount-voucher-item-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemUncheckedUpdateManyWithoutVoucherInput } from './discount-voucher-item-unchecked-update-many-without-voucher.input';

@InputType()
export class DiscountVoucherItemUpdateManyWithWhereWithoutVoucherInput {

    @Field(() => DiscountVoucherItemScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherItemScalarWhereInput)
    where!: DiscountVoucherItemScalarWhereInput;

    @Field(() => DiscountVoucherItemUncheckedUpdateManyWithoutVoucherInput, {nullable:false})
    @Type(() => DiscountVoucherItemUncheckedUpdateManyWithoutVoucherInput)
    data!: DiscountVoucherItemUncheckedUpdateManyWithoutVoucherInput;
}
