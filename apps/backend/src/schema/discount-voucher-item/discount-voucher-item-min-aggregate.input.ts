import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DiscountVoucherItemMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    discount_voucher_id?: true;

    @Field(() => Boolean, {nullable:true})
    course_id?: true;

    @Field(() => Boolean, {nullable:true})
    combo_id?: true;
}
