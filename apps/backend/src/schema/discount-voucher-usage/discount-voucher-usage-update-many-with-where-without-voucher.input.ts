import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUsageScalarWhereInput } from './discount-voucher-usage-scalar-where.input';
import { Type } from 'class-transformer';
import { DiscountVoucherUsageUpdateManyMutationInput } from './discount-voucher-usage-update-many-mutation.input';

@InputType()
export class DiscountVoucherUsageUpdateManyWithWhereWithoutVoucherInput {

    @Field(() => DiscountVoucherUsageScalarWhereInput, {nullable:false})
    @Type(() => DiscountVoucherUsageScalarWhereInput)
    where!: DiscountVoucherUsageScalarWhereInput;

    @Field(() => DiscountVoucherUsageUpdateManyMutationInput, {nullable:false})
    @Type(() => DiscountVoucherUsageUpdateManyMutationInput)
    data!: DiscountVoucherUsageUpdateManyMutationInput;
}
