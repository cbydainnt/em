import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherUserCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;
}
