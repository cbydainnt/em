import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherUserDiscount_voucher_idUser_idCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    discount_voucher_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;
}
