import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherItemUncheckedUpdateManyInput } from './discount-voucher-item-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { DiscountVoucherItemWhereInput } from './discount-voucher-item-where.input';

@ArgsType()
export class UpdateManyDiscountVoucherItemArgs {

    @Field(() => DiscountVoucherItemUncheckedUpdateManyInput, {nullable:false})
    @Type(() => DiscountVoucherItemUncheckedUpdateManyInput)
    data!: DiscountVoucherItemUncheckedUpdateManyInput;

    @Field(() => DiscountVoucherItemWhereInput, {nullable:true})
    @Type(() => DiscountVoucherItemWhereInput)
    where?: DiscountVoucherItemWhereInput;
}
