import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUpdateManyMutationInput } from './discount-voucher-update-many-mutation.input';
import { Type } from 'class-transformer';
import { DiscountVoucherWhereInput } from './discount-voucher-where.input';

@ArgsType()
export class UpdateManyDiscountVoucherArgs {

    @Field(() => DiscountVoucherUpdateManyMutationInput, {nullable:false})
    @Type(() => DiscountVoucherUpdateManyMutationInput)
    data!: DiscountVoucherUpdateManyMutationInput;

    @Field(() => DiscountVoucherWhereInput, {nullable:true})
    @Type(() => DiscountVoucherWhereInput)
    where?: DiscountVoucherWhereInput;
}
