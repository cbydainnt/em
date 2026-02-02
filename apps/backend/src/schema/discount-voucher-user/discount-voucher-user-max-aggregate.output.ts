import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DiscountVoucherUserMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    discount_voucher_id?: string;

    @Field(() => String, {nullable:true})
    user_id?: string;
}
