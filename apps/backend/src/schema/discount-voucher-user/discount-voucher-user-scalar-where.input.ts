import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class DiscountVoucherUserScalarWhereInput {

    @Field(() => [DiscountVoucherUserScalarWhereInput], {nullable:true})
    AND?: Array<DiscountVoucherUserScalarWhereInput>;

    @Field(() => [DiscountVoucherUserScalarWhereInput], {nullable:true})
    OR?: Array<DiscountVoucherUserScalarWhereInput>;

    @Field(() => [DiscountVoucherUserScalarWhereInput], {nullable:true})
    NOT?: Array<DiscountVoucherUserScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    discount_voucher_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;
}
