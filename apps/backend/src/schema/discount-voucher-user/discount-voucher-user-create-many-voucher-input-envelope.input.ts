import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DiscountVoucherUserCreateManyVoucherInput } from './discount-voucher-user-create-many-voucher.input';
import { Type } from 'class-transformer';

@InputType()
export class DiscountVoucherUserCreateManyVoucherInputEnvelope {

    @Field(() => [DiscountVoucherUserCreateManyVoucherInput], {nullable:false})
    @Type(() => DiscountVoucherUserCreateManyVoucherInput)
    data!: Array<DiscountVoucherUserCreateManyVoucherInput>;
}
