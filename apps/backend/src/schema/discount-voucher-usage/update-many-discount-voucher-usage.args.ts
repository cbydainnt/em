import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DiscountVoucherUsageUpdateManyMutationInput } from './discount-voucher-usage-update-many-mutation.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageWhereInput } from './discount-voucher-usage-where.input';

@ArgsType()
export class UpdateManyDiscountVoucherUsageArgs {

    @Field(() => DiscountVoucherUsageUpdateManyMutationInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateManyMutationInput)
    data!: DiscountVoucherUsageUpdateManyMutationInput;

    @Field(() => DiscountVoucherUsageWhereInput, {nullable:true})
    @Type(() => DiscountVoucherUsageWhereInput)
    where?: DiscountVoucherUsageWhereInput;
}
